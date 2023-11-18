import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";

class StoryController {
    create = catchAsync(async (req, res) => {
        const {
            body: { title, description, point, due, assigneeId, projectId }
        } = req;

        const input = {
            title: body.title,
            description: body.description,
            point: body.point,
            due: body.due,
            assigneeId: body.assigneeId,
            projectId: body.projectId
        };

        if (
            !input.title ||
            !input.description ||
            !input.point ||
            !input.due ||
            !input.assigneeId ||
            !input.projectId
        ) {
            throw new CustomError(
                "All fields are required: First name, Last name, Email, Position",
                400
            );
        }
        await storyService.create(body.input);
        res.status(201).send();
    });
}

export const storyController = new StoryController();
