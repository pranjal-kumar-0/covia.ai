import { Request, Response } from 'express';
import * as superadminService from './superadmin.service';

export const addEnterprise = async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newEnterprise = await superadminService.addNewEnterprise({ email, name })

        return res.status(201).json({
            message: "Enterprise Added!",
            enterprise: newEnterprise,
        })
    } catch (e) {
        console.error("Error adding the enterprise", e);
        res.status(500).json({ error: "Internal server error" })
    }

}