import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:[4,'minimum length of project name should be atlease 4']
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
})

const Project=mongoose.model('project',projectSchema)
export default Project