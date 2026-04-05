import prisma from "../../config/prisma";
import { Job } from './enterprise.types';

export const addNewJob = async(data:Job) => {
    const job = await prisma.job.create({
        data: {
            enterpriseId : data.enterpriseId,
            title : data.title,
            description : data.description,
        }
    })
    return job;
}