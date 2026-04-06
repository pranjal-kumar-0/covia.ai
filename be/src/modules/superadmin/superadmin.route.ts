import {Router} from 'express';
import * as superadminController from './superadmin.controller';

const router = Router();

router.delete('/enterprise/:id',superadminController.deleteEnterprise)

export default router;