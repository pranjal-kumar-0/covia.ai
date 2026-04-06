import prisma from "../../config/prisma";

export const deleteEnterprise = async (data:{enterpriseId:number}) => {
    const enterprise = await prisma.enterprise.delete({
        where: {
            id: data.enterpriseId
        }
    });
    return enterprise;
}