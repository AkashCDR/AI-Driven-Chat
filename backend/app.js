import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connect from "./db/db.js"
import morgan from "morgan";
import userRoutes from "./routes/user.route.js"
import projectRoutes from "./routes/project.route.js"
import aiRoutes from "./routes/ai.route.js"

connect();

const app=express()

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/projects',projectRoutes)
app.use('/ai',aiRoutes)


app.get("/",()=>{
    console.log("welcome to AI Driven Chat")
})

export default app