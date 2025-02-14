import dotenv from 'dotenv';    
dotenv.config();
import express from 'express';
import connectToDb from './db/db.js';
import cors from 'cors';
const app  = express();

app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({extended:true}));


await connectToDb();
app.get('/',(req,res)=>{
    res.send("hello world")
})


export default app;