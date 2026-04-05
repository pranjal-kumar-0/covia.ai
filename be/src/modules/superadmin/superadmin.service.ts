import prisma from "../../config/prisma";
import { Enterprise } from './superadmin.types';

export const addNewEnterprise = async (data:Enterprise) => {
    const enterprise = await prisma.enterprise.create({
        data: {
            email : data.email,
            name : data.name,
        }
    });
    return enterprise;
}