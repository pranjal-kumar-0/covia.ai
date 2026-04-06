import { Prisma } from "@prisma/client";
export interface JobApplication {
    clerkId: string;
    resume_data : string;
    jobId: number;
}

export type CandidateWithJobAndScore = Prisma.CandidateGetPayload<{
    include: { job: true; score: true };
}>;