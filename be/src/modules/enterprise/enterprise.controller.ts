import { Request, Response } from 'express';
import * as enterpriseService from './enterprise.service';

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