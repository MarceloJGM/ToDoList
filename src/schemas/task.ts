import { boolean, object, string } from "zod";

const taskSchema = object({
	user_id: string().trim().nonempty(),
	title: string().trim().min(1),
	description: string().trim().min(1).nullable().optional(),
	completed: boolean().optional(),
	favorite: boolean().optional(),
});

export const validateTask = (object: unknown) => {
	return taskSchema.safeParse(object);
};

export const validatePartialTask = (object: unknown) => {
	return taskSchema.partial().safeParse(object);
};
