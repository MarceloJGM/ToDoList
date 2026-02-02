import {
    CreatingTaskError,
    DeletingTaskError,
    GettingUserTasksError,
    TaskNotFoundError,
    UpdatingTaskError,
} from "@errors/index.ts";
import type { ITaskModel } from "@interfaces/index.ts";
import { sql } from "bun";

await sql`CREATE TABLE IF NOT EXISTS tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    favorite BOOLEAN NOT NULL DEFAULT FALSE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE
);`;

export const TaskModel: ITaskModel = {
    getAll: async ({ user_id }) => {
        try {
            const tasks =
                await sql`SELECT t.id, t.title, t.description, t.favorite, t.completed, t.createdAt, t.updatedAt FROM tasks as t INNER JOIN users as u ON t.user_id = u.id WHERE t.user_id = ${user_id};`;
            console.log(tasks)
            return tasks;
        } catch (_error) {
            throw new GettingUserTasksError();
        }
    },

    getById: async ({ id }) => {
        try {
            const [task] = await sql`SELECT * FROM tasks WHERE id = ${id};`;
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
            await sql`INSERT INTO tasks ${sql(input)};`;
            return true;
        } catch (_error) {
            throw new CreatingTaskError();
        }
    },

    update: async ({ id, input }) => {
        const [{ updatedAt }] = await sql`SELECT CURRENT_DATE updatedAt;`;
        const newData = {
            ...input,
            updatedAt,
        };

        try {
            await sql`UPDATE tasks SET ${sql(newData)} WHERE id = ${id}`;
            return true;
        } catch (_error) {
            throw new UpdatingTaskError();
        }
    },

    delete: async ({ id }) => {
        try {
            await sql`DELETE FROM tasks WHERE id = ${id}`;
            return true;
        } catch (_error) {
            throw new DeletingTaskError();
        }
    },
};
