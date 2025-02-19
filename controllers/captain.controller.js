import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import createCaptain from "../services/captain.service.js";

const registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, vehicle } = req.body;

    const isCaptain = await captainModel.findOne({ email });
    if (isCaptain) {
        return res.status(400).json({ error: "Captain already exists" })
    }

    const hashedPassword = await captainModel.hashPassword(req.body.password);
    const password = hashedPassword;
    try {
        const captain = await createCaptain({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        })
        const token = await captain.generateAuthToken();
        res.status(201).json({ captain, token })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// login controller for user login
const loginCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        const { email, password } = req.body;
        const user = await captainModel.findOne({ email }).select('+password');
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
        res.cookie('token', token)
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export default registerCaptain
export { loginCaptain }