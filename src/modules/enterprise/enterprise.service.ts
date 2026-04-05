import prisma from "../../config/prisma";
import { Enterprise, Job } from './enterprise.types';

export const processNewEnterprise = async (data:Enterprise) => {
    const enterprise = await prisma.enterprise.create({
        data: {
            email : data.email,
            name : data.name,
        }
    });
    return enterprise;
}

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