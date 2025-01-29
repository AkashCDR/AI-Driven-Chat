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



export const getAllProject=async (req,res)=>{
    try {

        console.log("in getAllProject controller email is ",req.user.email)
        
      const loggedInUser=await userModel.findOne({email:req.user.email});

      const allUserProjects=await projectService.getAllProjectByUserid({userId:loggedInUser._id});

      res.status(200).json({
        projects:allUserProjects
      })

    } catch (error) {
        console.log("error coming in getAllProject controller which is ",error)
        res.status(400).json({
            error:error.message
        })
    }
}


export const addUserToProject=async (req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
            errors:errors.array()
        })
    }

    try {
        const {projectId,users}=req.body;

        if(!projectId){
            res.status(400).json({
                message:'please give project Id'
            })
        }

        const loggedInUser=await userModel.findOne({email:req.user.email});

        console.log("in addUserToProject controller loggedInUser is ",loggedInUser)

        const project=await projectService.addUsersToProject({projectId,users,userId:loggedInUser._id})

        return res.status(200).json({
            project
        })



    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}


export const getProjectById=async (req,res)=>{
    const {projectId}=req.params;

    try {

        
 
        if(!projectId){
            res.status(401).json({
                error:'project Id is required in params'
            })
        }

      

        const project=await projectService.getProjectById({projectId:projectId})

        return res.status(200).json({
            project
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error:error.message
        })
    }
}