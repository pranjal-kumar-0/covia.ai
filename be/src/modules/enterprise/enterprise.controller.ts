import { Request, Response } from 'express';
import * as enterpriseService from './enterprise.service';
import * as candidateService from '../candidate/candidate.service'; // Imported candidate service
import { evaluateCandidates } from '../lib/evaluator'; // Imported evaluator
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

export const triggerEvaluation = catchAsync(async (req: Request, res: Response) => {
    const candidates = await candidateService.getUnevaluatedCandidates();

    if (candidates.length === 0) {
        return res.status(200).json({ 
            message: "All candidates already evaluated", 
            count: 0 
        });
    }
    await candidateService.claimCandidatesForEvaluation(candidates);

    evaluateCandidates(candidates).catch((err) => {
        console.error("Evaluation crashed:", err);
    });

    return res.status(200).json({
        message: `Evaluation started for ${candidates.length} candidates`,
        count: candidates.length,
    });
})