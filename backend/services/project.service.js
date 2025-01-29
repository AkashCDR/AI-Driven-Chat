import mongoose from "mongoose"
import projectModel from "../models/project.model.js"

export const createProject=async ({name,userId})=>{
if(!name){
    throw new Error('project name is required')
}
if(!userId){
    throw new Error('project creator id is required')
}

try {
    const project=await projectModel.create({
        name,
        users:[userId]
    })
    return project;
} catch (error) {
    throw error;
}

}




export const getAllProjectByUserid=async ({userId}) =>{

     try {
        if(!userId) throw new Error("user Id is required");
        const allUserProjects=await projectModel.find({users:userId})
        return allUserProjects;
     } catch (error) {
        throw new Error(error.message)
     }

}


export const addUsersToProject=async({projectId,users,userId})=>{

      if(!projectId){
        throw new Error('projectId is required');
      }

      if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('please give a valid projectId')
      }

      if(!users){
        throw new Error('users is required');
      }

      if(!Array.isArray(users) || users.some((userId)=> !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('please give a valid userId in users array')
      }

      if(!userId) throw new Error('user id is required')

        if(!mongoose.Types.ObjectId.isValid(userId)) throw new Error('please give a correct user Id')

      const project=await projectModel.findOne({
        _id:projectId,
        users:userId
      })

      if(!project) throw new Error('please provide correct credentials for project to add users')

        const updatedProject = await projectModel.findOneAndUpdate({
            _id: projectId
        }, {
            $addToSet: {
                users: {
                    $each: users
                }
            }
        }, {
            new: true
        })

        return updatedProject

}


export const getProjectById=async ({projectId})=>{
  if(!projectId) throw new Error('project Id is required');

  if(!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('please provide valid projectId');

  const project=await projectModel.findOne({_id:projectId}).populate('users')

  return project;

}