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
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryAndSubtaskPermissions,
    storyController.getOne
);
storyRouter.patch(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    authMiddleware.verifyReadUpdateDeleteStoryAndSubtaskPermissions,
    storyController.update
);

storyRouter.patch(
    "/:id/archive",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    authMiddleware.verifyReadUpdateDeleteStoryAndSubtaskPermissions,
    storyController.archive
);

storyRouter.delete(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.deleteOne
);

storyRouter.patch(
    "/:id/delete",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    authMiddleware.verifyReadUpdateDeleteStoryAndSubtaskPermissions,
    storyController.deleteOne
);

export { storyRouter };
