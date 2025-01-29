import { ExpressValidator, validationResult } from "express-validator"
import userModel from "../models/user.model.js"
import { createUser, getAllUsers } from "../services/user.service.js";
import redisClient from "../services/redis.service.js";

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

  console.log("login controller called")
  
const {email,password}=req.body;

console.log(`in the login controller we got email is ${email} and password is ${password}`)

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



export const logoutController = async (req, res) => {
  try {

    console.log("hi i am hereeee ")

      const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

      console.log("token is ",token)

      redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);

      res.status(200).json({
          message: 'Logged out successfully'
      });


  } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
  }
}



export const getAllUsersController=async (req,res)=>{
  try {
    const loggedInUser=await userModel.findOne({
      email:req.user.email
    })

    // console.log("i am with in the getAllUserController component and here the loggedInUser is ",loggedInUser)

    const allUsers=await getAllUsers({userId:loggedInUser._id});

    return res.status(200).json({
      users:allUsers
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error:error.message
    })
  }
}