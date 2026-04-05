import 'dotenv/config';
import express, { Request, Response} from 'express';
import candidateRouter from './modules/candidate/candidate.route';
import enterpriseRouter from './modules/enterprise/enterprise.route';
import authRouter from './modules/auth/auth.route';
import superadminRouter from './modules/superadmin/superadmin.route';
import { clerkMiddleware } from '@clerk/express';
import { requireAuth, requireOrgRole, requireOrg, requireSuperadmin } from './middlewares/auth.middleware';

const app = express();
const PORT = process.env.PORT;

app.use('/api/auth', authRouter);

app.use(express.json());
app.use(clerkMiddleware())

app.use('/api/candidates', requireAuth, candidateRouter);
app.use('/api/enterprise', requireAuth, requireOrg, requireOrgRole('org:admin'), enterpriseRouter);
app.use('/api/sa', requireAuth, requireSuperadmin, superadminRouter);


app.use('/health', (req: Request,res: Response) => {
    res.status(200).json({status: "OK", message: 'Server is running!'})
})

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})