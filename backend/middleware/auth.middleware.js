import jwt from "jsonwebtoken"

export const authUser=async (req,res,next)=>{
    try {
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];

        if(!token){
            res.status(401).json({
                error:'no token is found'
            })
        }

        const decoded=await jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;

        next();

    } catch (error) {
        console.log(error);

        res.status(401).send({ error: 'Unauthorized User' });
    }
}