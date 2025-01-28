import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { body } from "express-validator";
import { addUserToProject, createProject, getAllProject } from "../controllers/project.controller.js";

const router=Router();

router.post('/create',authUser,body('name').isString().withMessage('name is required'),createProject);

router.get('/all',authUser,getAllProject);

router.put('/add-user',authUser,body('projectId').isString().withMessage('project Id is required'),
body('users').isArray({min:1}).withMessage('users array is required'),
addUserToProject);

export default router