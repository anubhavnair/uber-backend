import express from 'express';
import registerCaptain, { getCaptainProfile, loginCaptain, logoutCaptain } from '../controllers/captain.controller.js';
import { body } from 'express-validator';
import { authCaptain } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage("Firstname should be atleast 3 characters long"),
    body('email').isEmail().withMessage("Please provide a valid email"),
    body('password').isLength({ min: 8 }).withMessage("Password should be atleast 8 characters long"),
    body('vehicle.color').isLength({ min: 3 }).notEmpty().withMessage("Vehicle color is required"),
    body('vehicle.plate').isLength({ min: 3 }).notEmpty().withMessage("Vehicle plate is required"),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage("Capacity should be at least 1"),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto', 'van']).withMessage("Vehicle type must be one of 'motorcycle', 'car', 'auto', 'van'")
], registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage("Please provide a valid email"),
    body('password').isLength({min:8}).withMessage("Password should be atleast 8 characters long")
],loginCaptain)

router.get('/profile',authCaptain,getCaptainProfile)

router.get('/logout',authCaptain,logoutCaptain)
export default router;


