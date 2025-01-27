import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { body } from "express-validator";
import { createProject } from "../controllers/project.controller.js";

const router=Router();

router.post('/create',authUser,body('name').isString().withMessage('name is required'),createProject);

export default router