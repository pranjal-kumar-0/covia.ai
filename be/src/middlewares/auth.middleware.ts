import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';
import prisma from '../config/prisma';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

export const requireOrg = (req: Request, res: Response, next: NextFunction) => {
    const { orgId } = getAuth(req);
    if (!orgId) return res.status(403).json({ error: "Organization required" })
    next()
}

export const requireOrgRole = (role: string) => (req: Request, res: Response, next: NextFunction) => {
    const { has } = getAuth(req)
    if (!has({ role })) return res.status(403).json({ error: 'Insufficient role' })
    next()
}

export const requireSuperadmin = (req: Request, res: Response, next: NextFunction) => {
    const {userId} = getAuth(req)
    if (userId !== process.env.SUPERADMIN_USER_ID){
        return res.status(403).json({error: 'Forbidden', message: 'Superadmin only'})
    }
    next()
}

export const requireEnterpriseOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orgId } = getAuth(req);
        const enterpriseId = req.params.enterpriseId as string;
        if (!enterpriseId) return next();

        const enterprise = await prisma.enterprise.findUnique({
            where: { id: parseInt(enterpriseId) },
            select: { clerkOrgId: true }
        });

        if (!enterprise || enterprise.clerkOrgId !== orgId) {
            return res.status(403).json({ error: "Forbidden: You do not own this enterprise" });
        }

        next();
    } catch (err) {
        next(err);
    }
};