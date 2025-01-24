import mongoose from "mongoose";

function connect(){
    const connection_string=process.env.MONGODB_URI;
    mongoose.connect(connection_string).then(()=>{
        console.log("database connected succesfully")
    }).catch((e)=>{
        console.log("error comes during the database connection which is ",e)
    })
}

export default connect