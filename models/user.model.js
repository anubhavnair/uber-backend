import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
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
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,

    }
})

// Middleware to exclude password from query results
userSchema.pre('find', function() {
    this.select('-password');
});

userSchema.pre('findOne', function() {
    this.select('-password');
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
    password = await bcrypt.hash(password,10)
    return password
}



const userModel = mongoose.model('User',userSchema);

export default userModel