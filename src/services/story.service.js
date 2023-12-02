import { prisma } from "../prisma/index.js";
import { projectService } from "./project.service.js";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/custom-error.js";
class StoryService {
    create = async (input) => {
        const story = await prisma.story.create({
            data: input
        });
        return story;
    };

    getOne = async (id) => {
        const story = await prisma.story.findUnique({
            where: {
                id: id
            }
        });

        return story;
    };

    getAll = async (projectId, adminId) => {
        const stories = await prisma.story.findMany({
            where: { projectId: projectId }
        });

        return stories;
    };

    update = async (id, update) => {
        await prisma.story.update({
            where: {
                id: id
            },
            date: {
                ...update
            }
        });
    };

    deleteOne = async (id) => {
        const story = await prisma.story.delete({
            where: {
                id: id
            }
        });
    };
}
export const storyService = new StoryService();
