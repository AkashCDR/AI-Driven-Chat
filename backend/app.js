import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connect from "./db/db.js"
import morgan from "morgan";
import userRouter from "./routes/user.route.js"

connect();

const app=express()

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/user',userRouter)


app.get("/",()=>{
    console.log("welcome to AI Driven Chat")
})

export default app