import {
	CreatingTaskError,
	DeletingTaskError,
	GettingUserTasksError,
	TaskNotFoundError,
	UpdatingTaskError,
} from "@errors/index.ts";
import type {
	ITask,
	ITaskCreateInput,
	ITaskUpdateInput,
} from "@interfaces/index.ts";
import axios from "axios";

const taskApiClient = axios.create({
	baseURL: new URL(
		"/api/tasks".concat(location.search),
		location.origin,
	).toString(),
	timeout: 10000,
});

taskApiClient.interceptors.response.use(
	(request) => request,
	(error) => {
		const { status } = error.request;

		if (status === 404) {
			throw new TaskNotFoundError();
		}
	},
);

export const fetchAllTasks = async () => {
	try {
		const request = await taskApiClient.get("");
		const { data } = request;
		return data;
	} catch (_error) {
		throw new GettingUserTasksError();
	}
};

export const fetchTaskById = async ({ id }: { id: ITask["id"] }) => {
	try {
		const request = await taskApiClient.get(`/${id}`);
		const { data } = request;
		return data;
	} catch (_error) {
		throw new GettingUserTasksError();
	}
};

export const fetchCreateTask = async ({
	input,
}: {
	input: ITaskCreateInput;
}) => {
	try {
		const request = await taskApiClient.post("", input);
		const { data } = request;
		return data;
	} catch (_error) {
		throw new CreatingTaskError();
	}
};

export const fetchUpdateTask = async ({
	id,
	input,
}: {
	id: ITask["id"];
	input: ITaskUpdateInput;
}) => {
	try {
		const request = await taskApiClient.patch(`/${id}`, input);
		const { data } = request;
		return data;
	} catch (_error) {
		throw new UpdatingTaskError();
	}
};

export const fetchDeleteTask = async ({ id }: { id: ITask["id"] }) => {
	try {
		const request = await taskApiClient.delete(`/${id}`);
		const { data } = request;
		return data;
	} catch (_error) {
		throw new DeletingTaskError();
	}
};
