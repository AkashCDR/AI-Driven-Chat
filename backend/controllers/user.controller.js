import { validationResult } from "express-validator"
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