import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/activate", userController.activate);
userRouter.patch("/forgot-password", userController.forgotPassword);
userRouter.patch("/reset-password", userController.resetPassword);
userRouter.get("/me", userMiddleware.authenticate, userController.getMe);
userRouter.delete(
    "/logout",
    userMiddleware.authenticate,
    userController.logout
);
userRouter.patch(
    "/me/tasks",
    userMiddleware.authenticate,
    userController.createTask
);

userRouter.get(
    "/me/tasks",
    userMiddleware.authenticate,
    userController.getTasks
);

userRouter.get(
    "/me/tasks/:taskId",
    userMiddleware.authenticate,
    userController.getTask
);

userRouter.patch(
    "/me/tasks/:taskId",
    userMiddleware.authenticate,
    userController.updateTask
);

userRouter.patch(
    "/me/tasks/:taskId/delete",
    userMiddleware.authenticate,
    userController.deleteTask
);

export { userRouter };