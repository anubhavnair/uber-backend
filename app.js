import dotenv from 'dotenv';    
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDb from './db/db.js';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app  = express();

app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


await connectToDb();
app.use('/api/users',userRoutes);
app.get('/',(req,res)=>{
    res.send("hello world")
})


export default app;