import dotenv from 'dotenv';    
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDb from './db/db.js';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app  = express();

// middle wares 
app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


// database connection
await connectToDb();

// route middlewares 
app.use('/api/users',userRoutes);

// sample server check 
app.get('/',(req,res)=>{
    res.send("hello world")
})

// exporting the app to use the server.js
export default app;