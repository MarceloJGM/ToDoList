import { object, string } from "zod";

const userSchema = object({
	username: string().trim().min(4).max(50).nonempty(),
	pwd: string().trim().min(6).max(50).nonempty(),
});

export const validateUser = (object: unknown) => {
	return userSchema.safeParse(object);
};
