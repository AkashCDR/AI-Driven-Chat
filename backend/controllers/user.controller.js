import { ExpressValidator, validationResult } from "express-validator"
import userModel from "../models/user.model.js"
import { createUser } from "../services/user.service.js";

export const createUserController=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(401).json({
        errors:errors.array()
      })
    };

    try {
        

        const user=await createUser(req.body);

        // console.log("success 1")

        const token=await user.generateJWT();


        // console.log("success 2")


        return res.status(201).json({
         user,token
        })

        
    } catch (error) {
        res.status(400).json({
            errors:error
        })
    }
    
}


export const loginController=async (req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
  res.status(400).json({errors:errors.array()})
}

try {
  
const {email,password}=req.body;

const user=await userModel.findOne({email}).select('+password');

if(!user){
  return res.status(401).json({
    errors:'user with this email is not present'
  })
}

const isMatched=await user.isValidPassword(password);

if(!isMatched){
  return res.status(401).json({
    errors: 'invalid creadentials'
  })
}

const token=await user.generateJWT();

return res.status(201).json({
  user,token
})


} catch (error) {
  console.log(error);
  res.status(401).json({
    error:error
  })
}

}


export const profileController=async (req,res)=>{
  res.status(200).json({
    user:req.user
  })
}