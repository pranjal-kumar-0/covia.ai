import {Router} from 'express';
import * as enterpriseController from './enterprise.controller';

const router = Router();

router.post('/:enterpriseId/job', enterpriseController.addNewJob);
router.delete('/:enterpriseId/:jobId', enterpriseController.deleteJob);


export default router;