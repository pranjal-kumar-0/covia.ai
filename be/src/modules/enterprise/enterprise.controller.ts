import { Request, Response } from 'express';
import * as enterpriseService from './enterprise.service';
import { catchAsync } from '../../../utils/catchAsync';
import { BadRequestError } from '../../../utils/errors';

export const addNewJob = catchAsync(async (req: Request, res: Response) => {
    const enterpriseId = req.params.enterpriseId as string;
    const { title, description } = req.body;
    if (!enterpriseId || !title || !description) {
        throw new BadRequestError("Missing required fields");
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
})

export const deleteJob = catchAsync(async (req: Request, res: Response) => {
    const enterpriseId = req.params.enterpriseId as string;
    const jobId = req.params.jobId as string;
    if (!enterpriseId || !jobId) {
        throw new BadRequestError("Missing required fields");
    }

    const job = await enterpriseService.deleteJob({
        enterpriseId: parseInt(enterpriseId),
        jobId: parseInt(jobId),
    })

    return res.status(200).json({
        meessage: "Job application deleted",
        job: job,
    })
})