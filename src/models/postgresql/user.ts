import {
	GenericLoginError,
	GenericUserCreationError,
	InvalidCredentialsError,
	UserAlreadyExistsError,
} from "@errors/index.ts";
import type { IUserModel } from "@interfaces/index.ts";
import { password, sql } from "bun";

await sql`
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
`;

export const UserModel: IUserModel = {
	register: async ({ username, pwd }) => {
		const userData = {
			username: username,
			password: await password.hash(pwd),
		};

		try {
			const [user] =
				await sql`SELECT username FROM users WHERE username = ${username};`;
			if (user) throw new UserAlreadyExistsError();

			const [{ id: user_id }] =
				await sql`INSERT INTO users ${sql(userData)} RETURNING id;`;

			return user_id;
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) {
				throw error;
			}

			throw new GenericUserCreationError();
		}
	},

	login: async ({ username, pwd }) => {
		try {
			const [user] =
				await sql`SELECT * FROM users WHERE username = ${username};`;
			if (!user) throw new InvalidCredentialsError();

			const isValid = await password.verify(pwd, user.password);
			if (!isValid) throw new InvalidCredentialsError();

			const { password: _, ...publicUser } = user;
			return publicUser;
		} catch (error) {
			if (error instanceof InvalidCredentialsError) {
				throw error;
			}

			throw new GenericLoginError();
		}
	},
};
