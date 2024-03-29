import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";
import { teamMemberService } from "../services/team-member.service.js";

class TeamMemberController {
    create = catchAsync(async (req, res) => {
        const { body, adminId } = req;

        const input = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            position: body.position,
            joinDate: body.joinDate
        };

        if (
            !input.firstName ||
            !input.lastName ||
            !input.email ||
            !input.position ||
            !input.joinDate
        ) {
            throw new CustomError(
                "All fields are required: First name, Last name, Email, Position",
                400
            );
        }

        const teamMember = await teamMemberService.create(adminId, input);
        res.status(201).send({
            data: teamMember
        });
    });

    createPassword = catchAsync(async (req, res) => {
        const {
            headers,
            body: { password, passwordConfirm, email }
        } = req;
        if (!headers.authorization) {
            throw new CustomError("Invite Token is missing", 401);
        }
        const [prefix, token] = headers.authorization.split(" ");

        if (!prefix || !token) {
            throw new CustomError("Token was not sent in correct form", 400);
        }

        if (!password || !passwordConfirm || !email) {
            throw new CustomError(
                "All fields are required: Password and Password Confirmation and email",
                400
            );
        }

        if (password !== passwordConfirm) {
            throw new CustomError(
                "Password and Password Confirmation must match",
                400
            );
        }

        await teamMemberService.createPassword(token, password, email);

        res.status(200).json({
            message: "You successfully created a password. Now, you can log in"
        });
    });

    getAll = catchAsync(async (req, res) => {
        const { adminId } = req;
        const teamMembers = await teamMemberService.getAll(adminId);

        res.status(200).json({
            data: teamMembers
        });
    });

    delete = catchAsync(async (req, res) => {
        const { adminId, params } = req;
        await teamMemberService.delete(adminId, params.id);

        res.status(204).send();
    });

    deactivate = catchAsync(async (req, res) => {
        const { adminId, params } = req;
        await teamMemberService.changeStatus(adminId, params.id, "DEACTIVATED");
        res.status(204).send();
    });

    reactivate = catchAsync(async (req, res) => {
        const { adminId, params } = req;
        await teamMemberService.changeStatus(adminId, params.id, "ACTIVE");
        res.status(204).send();
    });

    login = catchAsync(async (req, res) => {
        const {
            body: { email, password }
        } = req;

        if (!email || !password) {
            throw new CustomError(
                "All fields required: email and password",
                400
            );
        }
        const jwt = await teamMemberService.login(email, password);
        res.status(200).json({
            token: jwt
        });
    });

    forgotPassword = catchAsync(async (req, res) => {
        const {
            body: { email }
        } = req;

        await teamMemberService.forgotPassword(email);

        res.status(200).json({
            message:
                "We emailed you an instruction to reset your password. Follow it!"
        });
    });

    resetPassword = catchAsync(async (req, res) => {
        const {
            body: { password, passwordConfirm },
            headers
        } = req;
        if (!password || !passwordConfirm) {
            throw new CustomError(
                "Password and Password Confirm is required",
                400
            );
        }

        if (password !== passwordConfirm) {
            throw new CustomError(
                "Password and Password Confirm does not match",
                400
            );
        }
        if (!headers.authorization) {
            throw new CustomError("Reset Token is missing", 400);
        }

        const [bearer, token] = headers.authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
            throw new CustomError("Invalid Token", 400);
        }

        await teamMemberService.resetPassword(token, password);
        res.status(200).json({
            message: "Password successfully updated"
        });
    });

    getMe = catchAsync(async (req, res) => {
        const { teamMember } = req;

        const me = await teamMemberService.getMe(teamMember.id);

        res.status(200).json({
            data: me
        });
    });

    createTask = catchAsync(async (req, res) => {
        const { teamMember, body } = req;

        const input = {
            title: body.title,
            description: body.description,
            due: body.due
        };
        if (!input.title || !input.due) {
            throw new CustomError("Title or Due date cannot be empty", 400);
        }

        const data = await teamMemberService.createTask(teamMember.id, input);
        res.status(201).json({
            data
        });
    });

    getTask = catchAsync(async (req, res) => {
        const { teamMember, params } = req;

        const task = await teamMemberService.getTask(
            teamMember.id,
            params.taskId
        );

        res.status(200).json({
            data: task
        });
    });

    getTasks = catchAsync(async (req, res) => {
        const { teamMember } = req;
        if (!teamMember.id) {
            throw new CustomError(
                "Forbidden: You are not authorized to perform this action",
                403
            );
        }
        const tasks = await teamMemberService.getTasks(teamMember.id);
        res.status(200).json({
            data: tasks
        });
    });

    deleteTask = catchAsync(async (req, res) => {
        const { teamMember, params } = req;

        await teamMemberService.deleteTask(teamMember.id, params.taskId);
        res.status(204).send();
    });

    updateTask = catchAsync(async (req, res) => {
        const { teamMember, params, body } = req;

        const input = {};
        if (body.status) {
            input.status = body.status;
        }
        if (body.title) {
            input.title = body.title;
        }
        if (body.description) {
            input.description = body.description;
        }
        if (body.due) {
            input.due = body.due;
        }

        if (!Object.keys(input).length)
            throw new CustomError("Update data not provided", 400);

        await teamMemberService.updateTask(teamMember.id, params.taskId, input);
        res.status(204).send();
    });

    changePassword = catchAsync(async (req, res) => {
        const { teamMember, body } = req;

        const input = {
            password: body.password,
            newPassword: body.newPassword,
            newPasswordConfirm: body.newPasswordConfirm
        };

        if (
            !input.password ||
            !input.newPassword ||
            !input.newPasswordConfirm
        ) {
            "All fields are required: Current Password and New Password, New Password Confirmation",
                400;
        }

        if (input.password === input.newPassword) {
            throw new CustomError(
                "Provide Valid New Password which does not match Current Password ",
                400
            );
        }

        if (input.newPassword !== input.newPasswordConfirm) {
            throw new CustomError(
                "New Password and New Password Confirmation must match",
                400
            );
        }

        await teamMemberService.changePassword(teamMember.id, input);

        res.status(200).json({
            message: "You successfully updated your password!"
        });
    });

    update = catchAsync(async (req, res) => {
        const {
            adminId,
            params,
            body: { firstName, lastName, position, joinDate },
            body
        } = req;

        const updateData = {};

        if (firstName) {
            updateData.firstName = firstName;
        }
        if (lastName) {
            updateData.lastName = lastName;
        }
        if (position) {
            updateData.position = position;
        }
        if (joinDate) {
            updateData.joinDate = joinDate;
        }

        await teamMemberService.update(adminId, params.id, updateData);
        res.status(204).send();
    });

    changePasswordByAdmin = catchAsync(async (req, res) => {
        const { adminId, params, body } = req;

        const input = {
            newPassword: body.newPassword,
            newPasswordConfirm: body.newPasswordConfirm
        };

        if (!input.newPassword || !input.newPasswordConfirm) {
            "All fields are required: Current Password and New Password, New Password Confirmation",
                400;
        }

        if (input.newPassword !== input.newPasswordConfirm) {
            throw new CustomError(
                "New Password and New Password Confirmation must match",
                400
            );
        }

        await teamMemberService.changePasswordByAdmin(
            adminId,
            params.id,
            input
        );

        res.status(200).json({
            message: "You successfully updated your password!"
        });
    });
}

export const teamMemberController = new TeamMemberController();
