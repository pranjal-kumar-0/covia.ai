import {Router} from 'express';
import * as superadminController from './superadmin.controller';

const router = Router();

router.post('/add-enterprise', superadminController.addEnterprise);

export default router;