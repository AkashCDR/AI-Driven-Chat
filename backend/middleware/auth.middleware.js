import jwt from "jsonwebtoken"
import redisClient from "../services/redis.service.js";

export const authUser=async (req,res,next)=>{
    try {

        console.log("i am within authuser middleware")

        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

        // const token = req.cookies.token || req.headers.authorization;

        console.log("here the token is ",token)

        if(!token){
            res.status(401).json({
                error:'no token is found'
            })
        }

        const isBlackListed = await redisClient.get(token);

        if (isBlackListed) {

            res.cookie('token', '');

            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const decoded=await jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;

        next();

    } catch (error) {
        console.log(error);

        res.status(401).send({ error: 'Unauthorized User' });
    }
}