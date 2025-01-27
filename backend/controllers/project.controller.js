import { validationResult } from "express-validator"
import projectModel from "../models/project.model.js"
import userModel from "../models/user.model.js"
import * as projectService from "../services/project.service.js"

export const createProject=async (req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    try {
        const {name}=req.body;
        const userEmail=req.user.email;

        const isNameAlreadyPresent=await projectModel.findOne({name});

        if(isNameAlreadyPresent){
            res.status(401).json({
                message:'this project name is already present'
            })
        }

        const loggedInUser=await userModel.findOne({email:userEmail});

        if(!loggedInUser){
            res.status(400).json({
                message:'no user is logged in'
            })
        }

        const userId=loggedInUser._id;

        const newProject=await projectService.createProject({name,userId});

        res.status(201).json(newProject)


    } catch (error) {
        console.log(err);
        res.status(400).send(err.message);
    }
}