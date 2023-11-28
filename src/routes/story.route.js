import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { storyController } from "../controller/story.controller.js";

const storyRouter = Router();

storyRouter.post(
    "/",
    authMiddleware.authenticate,
    authMiddleware.verifyCreateStoryPermissions,
    storyController.create
);

storyRouter.get(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.getOne
);

storyRouter.get(
    "/projectStories/:id",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    storyController.getAll
);

storyRouter.patch(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.update
);
storyRouter.delete(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.deleteOne
);

export { storyRouter };
