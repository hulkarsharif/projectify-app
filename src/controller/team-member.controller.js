import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";

class TeamMemberController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
        };

        if (!input.firstName || !lastName || !email) {
            throw new CustomError(
                "FisrtName, LastName and Email are required",
                400
            );
        }
        await teamMemberService.creates(userId, input);
        res.status(201).send();
    });
}

export const teamMemberController = new TeamMemberController();
