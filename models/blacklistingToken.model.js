import mongoose from "mongoose";

const blacklistingTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    expiresAt:{
        type:Date,
        default:Date.now,
        
        expires:86400 //24hr
    }

})

const blacklistingTokenModel = mongoose.model('BlacklistingToken',blacklistingTokenSchema)

export default blacklistingTokenModel;