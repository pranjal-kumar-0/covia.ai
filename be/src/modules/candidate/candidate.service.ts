import prisma from "../../config/prisma";
import { CandidateWithJobAndScore, JobApplication } from './candidate.types';

export const submitApplication = async (data: JobApplication) => {
    
    const candidate = await prisma.candidate.update({
        where: {clerkId: data.clerkId},
        data: {
            resume_data: data.resume_data,
            jobId: data.jobId,
        }
    });
    return candidate;
}

export const getUnevaluatedCandidates = async (): Promise<CandidateWithJobAndScore[]> => {
    return prisma.candidate.findMany({
        where: {
            resume_data: { not: null },
            job: { isNot: null },
            OR: [
                { score: null },
                { score: { status: "FAILED" } },
            ],
        },
        include: { job: true, score: true },
    });
}

export const claimCandidatesForEvaluation = async (candidates: CandidateWithJobAndScore[]) => {
    return prisma.$transaction(
        candidates.map((c) =>
            prisma.candidateScore.upsert({
                where: { candidateId: c.id },
                create: {
                    candidateId: c.id,
                    scoreType: "ROUND1",
                    status: "PENDING",
                    score: 0,
                },
                update: {
                    status: "PENDING",
                    failReason: null,
                },
            })
        )
    );
}

export const markCandidateCompleted = async (candidateId: number, score: number) => {
    return prisma.candidateScore.update({
        where: { candidateId },
        data: { score, status: "COMPLETED" },
    });
}

export const markCandidateFailed = async (candidateId: number, reason: string) => {
    return prisma.candidateScore.update({
        where: { candidateId },
        data: {
            status: "FAILED",
            failReason: reason.slice(0, 500),
        },
    });
}