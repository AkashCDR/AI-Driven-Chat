import { Router } from "express";
import { body } from "express-validator";
import { createUserController, getAllUsersController, loginController, logoutController, profileController } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router=Router()

router.post('/register',body('email').isEmail().withMessage('please give a valid email'),body('password').isLength({min:4}).withMessage('password length should be atlease 4'),createUserController);

router.post('/login',body('email').isEmail().withMessage('please give a valid email'),body('password').isLength({min:4}).withMessage('password length should be atlease 4'),loginController);

router.get('/profile',authUser,profileController)

router.get('/logout',authUser,logoutController)

router.get('/all',authUser,getAllUsersController)

export default router;