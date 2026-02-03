import { JWT_SECRET_KEY } from "@config/index.ts";
import {
	CreatingTaskError,
	DeletingTaskError,
	GettingUserTasksError,
	NoTokenError,
	TaskNotFoundError,
	UpdatingTaskError,
	ValidationError,
} from "@errors/index.ts";
import type { ITaskModel } from "@interfaces/index.ts";
import { validatePartialTask, validateTask } from "@schemas/index.ts";
import type { BunRequest } from "bun";
import * as jose from "jose";

export class TaskController {
	private taskModel: ITaskModel;

	constructor({ taskModel }: { taskModel: ITaskModel }) {
		this.taskModel = taskModel;
	}

	getAll = async (req: BunRequest) => {
		try {
			// const searchParams = Object.fromEntries(new URL(req.url).searchParams);
			const token = req.cookies.get("access_token") || "";
			if (!token) {
				throw new NoTokenError();
			}
			const data = await jose.jwtVerify(token, JWT_SECRET_KEY);
			const { id: user_id } = data.payload;
			const tasks = await this.taskModel.getAll({
				user_id: user_id as string,
			});

			return Response.json(tasks, { status: 200 });
		} catch (error) {
			if (error instanceof NoTokenError) {
				return Response.json({ message: error.message }, { status: 498 });
			}

			return Response.json(
				{ message: new GettingUserTasksError().message },
				{ status: 500 },
			);
		}
	};

	getById = async (req: BunRequest) => {
		try {
			const { id } = req.params;
			const task = await this.taskModel.getById({ id: id?.toString() });

			if (!task) throw new TaskNotFoundError();

			return Response.json(task, { status: 200 });
		} catch (error) {
			if (error instanceof TaskNotFoundError) {
				return Response.json({ message: error.message }, { status: 404 });
			}

			return Response.json(
				{ message: new GettingUserTasksError().message },
				{ status: 500 },
			);
		}
	};

	create = async (req: BunRequest) => {
		try {
			const body = await req.json();
			const token = req.cookies.get("access_token") || "";
			if (!token) {
				throw new NoTokenError();
			}
			const data = await jose.jwtVerify(token, JWT_SECRET_KEY);
			const { id: user_id } = data.payload;
			const input = {
				...body,
				user_id,
			};
            console.log(input)
			const result = validateTask(input);

			if (result.error) {
				throw new ValidationError(JSON.parse(result.error.message));
			}

			await this.taskModel.create({ input: result.data });
			return Response.json({ message: "Task created" }, { status: 201 });
		} catch (error) {
			if (error instanceof ValidationError) {
				return Response.json({ message: error.message }, { status: 400 });
			}
			return Response.json(
				{ message: new CreatingTaskError().message },
				{ status: 500 },
			);
		}
	};

	update = async (req: BunRequest) => {
		try {
			const { id } = req.params;
			const body = await req.json();
			const result = validatePartialTask(body);

			if (result.error) {
				throw new ValidationError(JSON.parse(result.error.message));
			}
			await this.taskModel.update({
				id: id?.toString(),
				input: result.data,
			});
			return Response.json({ message: "Task updated" }, { status: 200 });
		} catch (error) {
			if (error instanceof ValidationError) {
				return Response.json({ message: error.message }, { status: 400 });
			}

			return Response.json(
				{ message: new UpdatingTaskError().message },
				{ status: 500 },
			);
		}
	};

	delete = async (req: BunRequest) => {
		try {
			const { id } = req.params;
			await this.taskModel.delete({ id: id?.toString() });
			return Response.json({ message: "Task deleted" }, { status: 200 });
		} catch (_error) {
			return Response.json(
				{ message: new DeletingTaskError().message },
				{ status: 500 },
			);
		}
	};
}
