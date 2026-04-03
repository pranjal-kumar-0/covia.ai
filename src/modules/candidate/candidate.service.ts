import prisma from "../../config/prisma";
import { ApplicantData } from './candidate.types';

export const processNewApplicant = async (data: ApplicantData) => {
    
    const candidate = await prisma.Candidate.create({
        data: {
            name : data.name,
            email: data.email,
            resume_data: data.resume_data,
            jobId: data.jobId,
        }
    });
    return candidate;
}