import userModel from "../models/user.model.js"

export const createUser=async ({email,password})=>{

if(!email || !password){
    throw new Error('email and password are required')
}



const hashedPassword=await userModel.hashPassword(password);

// console.log("success 0")

const user=await userModel.create({email,password:hashedPassword});

return user;

}



export const getAllUsers=async ({userId})=>{

    // console.log("with in the getAllUsers component in services the value of userId is ",userId)
     
    if(!userId){
         throw new Error('user Id is required')
    }

    const users=await userModel.find({_id:{$ne:userId}})
    return users;
}