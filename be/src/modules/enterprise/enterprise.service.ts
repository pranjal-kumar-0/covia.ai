import prisma from "../../config/prisma";
import { AddJob, DeleteJob } from './enterprise.types';

export const addNewJob = async(data:AddJob) => {
    const job = await prisma.job.create({
        data: {
            enterpriseId : data.enterpriseId,
            title : data.title,
            description : data.description,
        }
    })
    return job;
}

export const deleteJob = async(data:DeleteJob) => {
    const job = await prisma.job.delete({
        where: {
            id: data.jobId,
            enterpriseId: data.enterpriseId
        }
    })
    return job;
}