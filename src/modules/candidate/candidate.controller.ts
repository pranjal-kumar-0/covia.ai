import {Request, Response} from 'express';
import * as candidateService from './candidate.service';

export const submitApllication = async(req:Request, res:Response) => {
    try{
        const {name, email, resume_data, jobId} = req.body;

        if (!email || !resume_data || !jobId){
            return res.status(400).json({error: "Missing Required Fields"});
        }

        const newCandidate = await candidateService.processNewApplicant({
            name,
            email,
            resume_data,
            jobId
        })

        res.status(201).json({
            message: "Application submitted!",
            candidate: newCandidate
        })
    } catch (error) {
        console.error("Error in submitting application", error);
        res.status(500).json({error: "Internal server error"})
    }
}