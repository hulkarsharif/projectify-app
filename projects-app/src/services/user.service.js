import { prisma } from "../prisma/index.js";

class UserService {
    signUp = async (input) => {
        try {
            await prisma.user.create({ data: input });
        } catch (err) {
            throw new Error(err);
        }
    };
}

export const userService = new UserService();
