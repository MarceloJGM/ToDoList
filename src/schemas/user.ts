import { object, string } from "zod";

const userSchema = object({
    username: string().trim().min(4).nonempty(),
    pwd: string().trim().min(6).nonempty(),
});

export const validateUser = (object: unknown) => {
    return userSchema.safeParse(object);
};
