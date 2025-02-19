import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlenght:[3,"Firstname should be atleast 3 characters long"],


        },
        lastname:{
            type:String,
            minlenght:[3,"Lastname should be atleast 3 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,

    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity should be atleast 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['motorcycle','car','auto','van']
        }
    },
    location:{
        lat:{
            type:Number,
            
        },
        long:{
            type:Number
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password){
    password = await bcrypt.hash(password,10)
    return password
}


const captainModel = mongoose.model('Captain',captainSchema);

export default captainModel