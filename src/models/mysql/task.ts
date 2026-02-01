import {
    CreatingTaskError,
    DeletingTaskError,
    GettingUserTasksError,
    TaskNotFoundError,
    UpdatingTaskError,
} from "@errors/index.ts";
import type { EnvVariables, ITaskModel } from "@interfaces/index.ts";
import { env, SQL } from "bun";

const db = new SQL((env as unknown as EnvVariables).DATABASE_URL);

await db`CREATE TABLE IF NOT EXISTS tasks (
    id CHAR(36) NOT NULL DEFAULT UUID() PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    favorite BOOLEAN NOT NULL DEFAULT FALSE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt DATE NOT NULL DEFAULT CURDATE(),
    updatedAt DATE NOT NULL DEFAULT CURDATE());`;

export const TaskModel: ITaskModel = {
    getAll: async ({ user_id }) => {
        try {
            const tasks =
                await db`SELECT t.id, t.title, t.description, t.favorite, t.completed, t.createdAt, t.updatedAt FROM tasks as t INNER JOIN users as u ON t.user_id = u.id WHERE t.user_id = ${user_id};`;
            return tasks;
        } catch (_error) {
            throw new GettingUserTasksError();
        }
    },

    getById: async ({ id }) => {
        try {
            const [task] =
                await db`SELECT id, title, description FROM tasks WHERE id = ${id};`;
            if (!task) throw new TaskNotFoundError();
            return task;
        } catch (error) {
            if (error instanceof TaskNotFoundError) {
                throw error;
            }

            throw new GettingUserTasksError();
        }
    },

    create: async ({ input }) => {
        try {
            await db`INSERT INTO tasks ${db(input)};`;
            return true;
        } catch (_error) {
            throw new CreatingTaskError();
        }
    },

    update: async ({ id, input }) => {
        const [{ updatedAt }] = await db`SELECT CURDATE() updatedAt;`;
        const newData = {
            ...input,
            updatedAt,
        };

        try {
            await db`UPDATE tasks SET ${db(newData)} WHERE id = ${id}`;
            return true;
        } catch (_error) {
            throw new UpdatingTaskError();
        }
    },

    delete: async ({ id }) => {
        try {
            await db`DELETE FROM tasks WHERE id = ${id}`;
            return true;
        } catch (_error) {
            throw new DeletingTaskError();
        }
    },
};
