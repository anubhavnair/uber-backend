import express from 'express';
import registerUser from '../controllers/user.controller.js';
import {body} from 'express-validator'
// import { createUser, getUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
const router = express.Router()


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage("Firstname should be atleast 3 characters long"),
    body('email').isEmail().withMessage("Please provide a valid email"),
    body('password').isLength({min:8}).withMessage("Password should be atleast 8 characters long")
],registerUser)



export default router;