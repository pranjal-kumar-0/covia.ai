import {Router} from 'express';
import * as candidateController from './candidate.controller';

const router = Router();
//this is for applicants to apply for a listed job
router.post('/:jobId/apply', candidateController.submitApllication);

export default router;