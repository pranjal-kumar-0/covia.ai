import prisma from "../../config/prisma";

export const syncCandidate = async (data: { clerkId: string, email: string, name: string }) => {
    return await prisma.candidate.upsert({
        where: { clerkId: data.clerkId },
        update: {
            email: data.email,
            name: data.name,
        },
        create: {
            clerkId: data.clerkId,
            email: data.email,
            name: data.name,
        }
    });
};