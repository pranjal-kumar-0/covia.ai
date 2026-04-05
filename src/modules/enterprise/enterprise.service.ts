import prisma from "../../config/prisma";
import { Enterprise } from './enterprise.types';

export const processNewEnterprise = async (data:Enterprise) => {
    const enterprise = await prisma.enterprise.create({
        data: {
            email : data.email,
            name : data.name,
        }
    });
    return enterprise;
}