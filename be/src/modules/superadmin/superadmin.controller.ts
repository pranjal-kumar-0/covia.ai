import { Request, Response } from 'express';
import * as superadminService from './superadmin.service';
import { catchAsync } from '../../../utils/catchAsync';
import { BadRequestError } from '../../../utils/errors';

export const addEnterprise = catchAsync(async (req: Request, res: Response) => {
    const { email, name } = req.body;
    if (!email || !name) {
        throw new BadRequestError("Missing required fields");
    }
    const newEnterprise = await superadminService.addNewEnterprise({ email, name });
    return res.status(201).json({
        message: "Enterprise Added!",
        enterprise: newEnterprise,
    });
});

export const deleteEnterprise = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    if (!id) {
        throw new BadRequestError("Missing required fields");
    }
    const enterprise = await superadminService.deleteEnterprise({ enterpriseId: parseInt(id) });
    return res.status(200).json({
        message: "Enterprise Deleted!",
        enterprise: enterprise,
    });
});