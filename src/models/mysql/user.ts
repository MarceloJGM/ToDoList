import {
	GenericLoginError,
	GenericUserCreationError,
	InvalidCredentialsError,
	UserAlreadyExistsError,
} from "@errors/index.ts";
import type { EnvVariables, IUserModel } from "@interfaces/index.ts";
import { env, password, SQL } from "bun";

const db = new SQL(`${(env as unknown as EnvVariables).MYSQL_URL}?ssl=true`);

await db`
    CREATE TABLE IF NOT EXISTS users (
        id CHAR(36) NOT NULL DEFAULT UUID() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
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
				await db`SELECT * FROM users WHERE username = ${username};`;
			if (user) throw new UserAlreadyExistsError();

			const [{ id: user_id }] =
				await db`INSERT INTO users ${db(userData)} RETURNING id;`;

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
				await db`SELECT * FROM users WHERE username = ${username};`;
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
