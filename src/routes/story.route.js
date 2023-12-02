import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { storyController } from "../controller/story.controller.js";

const storyRouter = Router();

storyRouter.post(
    "/",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    authMiddleware.verifyCreateStoryPermissions,
    storyController.create
);

storyRouter.get(
    "/:storyId",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryAndSubtaskPermissions,
    storyController.getOne
);

storyRouter.get(
    "/projectStories/:projectId",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    storyController.getAll
);

storyRouter.patch(
    "/:storyId",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    authMiddleware.verifyReadUpdateDeleteStoryAndSubtaskPermissions,
    storyController.update
);
storyRouter.delete(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.deleteOne
);

storyRouter.delete(
    "/storyId",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    authMiddleware.verifyReadUpdateDeleteStoryAndSubtaskPermissions,
    storyController.deleteOne
);

export { storyRouter };
