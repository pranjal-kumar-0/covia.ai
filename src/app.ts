import express, {Request, Response} from 'express';
import candidateRouter from './modules/candidate/candidate.route';
import enterpriseRouter from './modules/enterprise/enterprise.route';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/candidates', candidateRouter);
app.use('/api/enterprise', enterpriseRouter);


app.use('/health', (req: Request,res: Response) => {
    res.status(200).json({status: "OK", message: 'Server is running!'})
})

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})