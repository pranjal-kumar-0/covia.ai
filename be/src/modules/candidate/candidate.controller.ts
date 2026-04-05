import {Request, Response} from 'express';
import * as candidateService from './candidate.service';
import { catchAsync } from '../../../utils/catchAsync';
import { BadRequestError } from '../../../utils/errors';

export const submitApllication = catchAsync(async(req:Request, res:Response) => {
        const {name, email, resume_data, jobId} = req.body;
        if (!email || !resume_data || !jobId){
            throw new BadRequestError("Missing required fields");
        }

        const newCandidate = await candidateService.processNewApplicant({
            name,
            email,
            resume_data,
            jobId
        })

        return res.status(201).json({
            message: "Application submitted!",
            candidate: newCandidate
        })
})