import {Router} from 'express';
import * as candidateController from './candidate.controller';

const router = Router();

router.post('/:jobId/apply', candidateController.submitApllication);

export default router;