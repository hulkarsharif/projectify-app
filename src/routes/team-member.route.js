import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { teamMemberController } from "../controller/team-member.controller.js";

const teamMemberRouter = new Router();

teamMemberRouter.post(
    "/",
    adminMiddleware.authenticate,
    teamMemberController.create
);

teamMemberRouter.patch("/create-password", teamMemberController.createPassword);

export { teamMemberRouter };
