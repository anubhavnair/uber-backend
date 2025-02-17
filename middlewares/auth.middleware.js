import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import blacklistingTokenModel from "../models/blacklistingToken.model.js";


const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    const isBlackList = await blacklistingTokenModel.findOne({ token });
    if (isBlackList) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    // console.log(token)
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decode)
        const user = await userModel.findById(decoded.id);
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        req.user = user;
        return next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" })
    }
}

export default authUser;