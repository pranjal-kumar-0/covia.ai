import prisma from "../../config/prisma";
import { AddEnterprise } from './superadmin.types';

export const addNewEnterprise = async (data:AddEnterprise) => {
    const enterprise = await prisma.enterprise.create({
        data: {
            email : data.email,
            name : data.name,
        }
    });
    return enterprise;
}

export const deleteEnterprise = async (data:{enterpriseId:number}) => {
    const enterprise = await prisma.enterprise.delete({
        where: {
            id: data.enterpriseId
        }
    });
    return enterprise;
}