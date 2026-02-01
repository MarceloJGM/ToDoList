import {
    AuthController,
    TaskController,
    UserController,
} from "@controllers/index.ts";
import { TaskModel, UserModel } from "@models/mysql/index.ts";
import { serve } from "bun";
import index from "./index.html";

const userController = new UserController({ userModel: UserModel });
const authController = new AuthController();
const taskController = new TaskController({ taskModel: TaskModel });

const server = serve({
    routes: {
        "/*": index,

        "/api/users/login": {
            POST: userController.login,
        },

        "/api/users/register": {
            POST: userController.register,
        },

        "/api/auth/session": authController.session,
        "/api/auth/logout": authController.logout,

        "/api/tasks": {
            GET: taskController.getAll,
            POST: taskController.create,
        },

        "/api/tasks/:id": {
            GET: taskController.getById,
            PATCH: taskController.update,
            DELETE: taskController.delete,
        },
    },

    development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: true,
    },
});

console.log(`🚀 Server running at ${server.url}`);
