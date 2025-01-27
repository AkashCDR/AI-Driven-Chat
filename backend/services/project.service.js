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
        user:[userId]
    })
    return project;
} catch (error) {
    throw error;
}

}