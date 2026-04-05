import {Router} from 'express';
import * as enterpriseController from './enterprise.controller';

const router = Router();

router.post('/register', enterpriseController.addEnterprise);

export default router;