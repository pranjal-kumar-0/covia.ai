import {Router} from 'express';
import * as candidateController from './candidate.controller';

const router = Router();

router.post('/apply', candidateController.submitApllication);

export default router;