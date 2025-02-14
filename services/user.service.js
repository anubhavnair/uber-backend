import userModel from "../models/user.model.js";

const createUser = async ({fullname,email,password}) => {

    if(!fullname.firstname || !email || !password){
        throw new Error("Please provide all required fields")
    }
    const user = await userModel.create({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password
    })

    return user

}

export default createUser;