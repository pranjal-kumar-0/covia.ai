import { Request, Response } from 'express';
import * as candidateService from './candidate.service';
import { getAuth } from '@clerk/express';
import { catchAsync } from '../../../utils/catchAsync';
import { BadRequestError, UnauthorizedError } from '../../../utils/errors';

export const submitApllication = catchAsync(async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    if(!userId){
        throw new UnauthorizedError("User is not authenticated")
    }

    const { resume_data } = req.body;
    const jobId = req.params.jobId as string;
    if (!resume_data || !jobId) {
        throw new BadRequestError("Missing required fields");
    }

    const Candidate = await candidateService.submitApplication({
        clerkId: userId,
        resume_data: resume_data,
        jobId: parseInt(jobId),
    })

    return res.status(201).json({
        message: "Application submitted!",
        candidate: Candidate
    })
})