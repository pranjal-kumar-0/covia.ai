import prisma from "../../config/prisma";
import { JobApplication } from './candidate.types';

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