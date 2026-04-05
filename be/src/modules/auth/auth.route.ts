import { Router } from 'express';
import express from 'express';
import * as authController from './auth.controller';

const router = Router();

router.post(
    '/webhooks', 
    express.raw({ type: 'application/json' }), 
    authController.handleClerkWebhook
);

export default router;