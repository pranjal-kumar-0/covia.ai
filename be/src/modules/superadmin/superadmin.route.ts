import {Router} from 'express';
import * as superadminController from './superadmin.controller';

const router = Router();

router.post('/add-enterprise', superadminController.addEnterprise);
router.delete('/enterprise/:id',superadminController.deleteEnterprise)

export default router;