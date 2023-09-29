import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);

export { userRouter };
