import userModel from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";


// register controller for user 
const registerUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        const { fullname, email, password } = req.body;
        const hashedPassword = await userModel.hashPassword(password);
        req.body.password = hashedPassword;
        const user = await createUser(req.body);
        const token = await user.generateAuthToken();
        res.status(201).json({ user,token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}


// login controller for user login
const loginUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        // res.json(user)
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" })
        }
        const isMatch = await user.comparePassword(password);
        // console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" })
        }
        const token = await user.generateAuthToken();
        res.status(200).json({ user,token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
 }

export default registerUser;
export{loginUser};