// import 'dotenv/config';
// import http from "http"
// import app from "./app.js";
// import {Server} from "socket.io"
// import mongoose from 'mongoose';
// import projectModel from "./models/project.model.js"
// import jwt from "jsonwebtoken"

// const port=process.env.PORT || 3000

// const server=http.createServer(app);


// const io = new Server(server, {
//     cors: {
//         origin: '*'
//     }
// });

// io.use(async(socket,next)=>{
//     try {
//         const token=socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
//         const projectId=socket.handshake.query?.projectId;

//         if(!mongoose.Types.ObjectId.isValid(projectId)){
//             return next(new Error('invalid project Id'))
//         }

//         socket.project=await projectModel.findById(projectId);


//         if(!token){
//             return next(new Error('authentication error'))
//         }

//         const decode=await jwt.verify(token,process.env.JWT_SECRET);

//         if(!decode){
//             return next(new Error('authentication error'));
//         }

//         socket.user=decode;

//         next();



//     } catch (error) {
//         next(error)
//     }
// })





// // io.on('connection',socket=>{
// //     socket.roomId=socket.projectId._id.toString();

// //     console.log(`user with user id ${socket.user._id} is connected`);

// //     socket.join(socket.roomId);

// //     socket.on('project-message', async (data)=>{
// //         console.log(`message is sending from backend ${data}`)
// //         socket.broadcast.to(socket.roomId).emit('project-message',data)
// //     })


// //     socket.on('disconnect',()=>{
// //         console.log('user disconnected');
// //         socket.leave(socket.roomId)
// //     })


// // })




// io.on("connection", (socket) => {
//     if (!socket.project) return; // Prevent undefined errors

//     socket.roomId = socket.project._id.toString(); // Fix project ID

//     console.log(`User ${socket.user._id} connected to room ${socket.roomId}`);

//     socket.join(socket.roomId); // Join the correct room

//     socket.on("project-message", async (data) => {
//         console.log(`Message received in backend`);
//         socket.to(socket.roomId).emit("project-message", data); // Emit to correct room
//     });

//     socket.on("disconnect", () => {
//         console.log(`User ${socket.user._id} disconnected`);
//         socket.leave(socket.roomId);
//     });
// });









// server.listen(port,()=>{
//     console.log("server is listening at port ",port);
// })





import 'dotenv/config';
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import projectModel from "./models/project.model.js";
import jwt from "jsonwebtoken";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || 
                      socket.handshake.headers.authorization?.split(' ')[1];

        const projectId = socket.handshake.query?.projectId;

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error("Invalid project ID"));
        }

        socket.project = await projectModel.findById(projectId);
        if (!socket.project) {
            return next(new Error("Project not found"));
        }

        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return next(new Error("Authentication error: Invalid token"));
        }

        socket.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
});

io.on("connection", (socket) => {
    if (!socket.project) return; // Prevent undefined errors

    socket.roomId = socket.project._id.toString(); // Fix project ID

    console.log(`✅ User ${socket.user.email} connected to room ${socket.roomId}`);

    socket.join(socket.roomId); // Join the correct room

    socket.on("project-message", async (data) => {
        console.log(`📩 Message received in backend:`, data);
        socket.to(socket.roomId).emit("project-message", data); // Emit to correct room
    });

    socket.on("disconnect", () => {
        console.log(`❌ User ${socket.user.email} disconnected`);
        socket.leave(socket.roomId);
    });
});

server.listen(port, () => {
    console.log("Server is listening at port", port);
});
