import 'dotenv/config';
import express, {NextFunction, Request, Response} from 'express';
import candidateRouter from './modules/candidate/candidate.route';
import enterpriseRouter from './modules/enterprise/enterprise.route';
import authRouter from './modules/auth/auth.route';
import { clerkMiddleware, getAuth } from '@clerk/express';

const app = express();
const PORT = process.env.PORT;

app.use('/api/auth', authRouter);

app.use(express.json());
app.use(clerkMiddleware())

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

app.use('/api/candidates', requireAuth, candidateRouter);
app.use('/api/enterprise', requireAuth, enterpriseRouter);


app.use('/health', (req: Request,res: Response) => {
    res.status(200).json({status: "OK", message: 'Server is running!'})
})

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})