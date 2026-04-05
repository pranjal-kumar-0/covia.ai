import { Request, Response } from 'express';
import { verifyWebhook } from '@clerk/express/webhooks';
import * as authService from './auth.service';

export const handleClerkWebhook = async (req: Request, res: Response) => {
    try {
        const evt = await verifyWebhook(req);
          const eventType = evt.type;

        if (eventType === 'user.created') {
            const { id, email_addresses, first_name, last_name } = evt.data;
            const primaryEmail = email_addresses?.[0]?.email_address;
            const fullName = `${first_name} ${last_name}`;
            
            if (primaryEmail) {
                await authService.syncCandidate({ 
                    clerkId: id as string, 
                    email: primaryEmail, 
                    name: fullName
                });
                console.log(`Candidate created/synced: ${id} - ${primaryEmail}`);
            }
        }

        return res.status(200).json({ success: true, message: 'Webhook received' });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return res.status(400).json({ error: 'Error verifying webhook' });
    }
};