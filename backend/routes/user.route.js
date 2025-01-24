import { Router } from "express";
import { body } from "express-validator";
import { createUserController } from "../controllers/user.controller.js";

const router=Router()

router.post('/register',body('email').isEmail().withMessage('please give a valid email'),body('password').isLength({min:4}).withMessage('password length should be atlease 4'),createUserController);

export default router;