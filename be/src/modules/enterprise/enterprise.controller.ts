import { Request, Response } from 'express';
import * as enterpriseService from './enterprise.service';

export const addEnterprise = async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newEnterprise = await enterpriseService.processNewEnterprise({ email, name })

        return res.status(201).json({
            message: "Enterprise Added!",
            enterprise: newEnterprise,
        })
    } catch (e) {
        console.error("Error adding the enterprise", e);
        res.status(500).json({ error: "Internal server error" })
    }

}

export const addNewJob = async (req: Request, res: Response) => {
    try {
        const enterpriseId = req.params.enterpriseId as string;
        const { title, description } = req.body;
        if (!enterpriseId || !title || !description) {
            res.status(400).json({ error: "Missing required fields" });
        }

        const newJob = await enterpriseService.addNewJob({
            enterpriseId: parseInt(enterpriseId),
            title,
            description
        })

        return res.status(200).json({
            meessage: "New job added!",
            job: newJob,
        })
    } catch (e) {
        console.error("Error adding a new job", e);
        res.status(500).json({ error: "Internal server error" })
    }
}