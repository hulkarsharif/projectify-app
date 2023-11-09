import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { teamMemberController } from "../controller/team-member.controller.js";

const teamMemberRouter = new Router();

teamMemberRouter.post(
    "/",
    userMiddleware.authenticate,
    teamMemberController.create
);

export { teamMemberRouter };
