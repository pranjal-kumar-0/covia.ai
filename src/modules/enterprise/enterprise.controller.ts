import { Request, Response } from 'express';
import * as enterpriseService from './enterprise.service';
import { error } from 'node:console';

export const addEnterprise = async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newEnterprise = await enterpriseService.processNewEnterprise({
            email,
            name
        })

        return res.status(201).json({
            message: "Enterprise Added!",
            enterprise : newEnterprise
        })
    } catch (e) {
        console.error("Error adding the enterprise", e);
        res.status(500).json({error: "Internal server error"})
    }
    
}