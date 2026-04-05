import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';

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