import {Router} from 'express';
import * as enterpriseController from './enterprise.controller';

const router = Router();
//this is for entterprise to create a job for themselves
router.post('/:enterpriseId/job', enterpriseController.addNewJob);

//this is for enterprise to delete a job that they created
router.delete('/:enterpriseId/:jobId', enterpriseController.deleteJob);

//this is for an enterprise to evaluate all the applicatnts who applied for the job
router.post('/:enterpriseId/evaluate', enterpriseController.triggerEvaluation);

export default router;