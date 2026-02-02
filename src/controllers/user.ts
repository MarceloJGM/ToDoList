import { JWT_SECRET_KEY, JWT_SIGNATURE_ALGORITHM } from "@config/index.ts";
import {
	GenericLoginError,
	GenericUserCreationError,
	InvalidCredentialsError,
	UserAlreadyExistsError,
	ValidationError,
} from "@errors/index.ts";
import type { IUserModel } from "@interfaces/index.ts";
import { validateUser } from "@schemas/index.ts";
import type { BunRequest } from "bun";
import { Cookie, env } from "bun";
import * as jose from "jose";

export class UserController {
	private userModel: IUserModel;

	constructor({ userModel }: { userModel: IUserModel }) {
		this.userModel = userModel;
	}

	register = async (req: BunRequest) => {
		const body = await req.json();
		const result = validateUser(body);

		try {
			if (result.error) {
				throw new ValidationError(JSON.parse(result.error.message));
			}

			const { username, pwd } = result.data;
			const user_id = await this.userModel.register({
				username,
				pwd,
			});

			return Response.json(user_id, { status: 201 });
		} catch (error) {
			if (error instanceof ValidationError) {
				return Response.json({ message: error.message }, { status: 400 });
			}

			if (error instanceof UserAlreadyExistsError) {
				return Response.json({ message: error.message }, { status: 409 });
			}

			return Response.json(
				{ message: new GenericUserCreationError().message },
				{ status: 500 },
			);
		}
	};

	login = async (req: BunRequest) => {
		const body = await req.json();
		const result = validateUser(body);

		try {
			if (result.error) {
				throw new ValidationError(JSON.parse(result.error.message));
			}

			const { username, pwd } = result.data;
			const user = await this.userModel.login({ username, pwd });

			const token = await new jose.SignJWT({
				id: user.id,
				username: user.username,
			})
				.setProtectedHeader({ alg: JWT_SIGNATURE_ALGORITHM })
				.setIssuedAt()
				.setExpirationTime("1hr")
				.sign(JWT_SECRET_KEY);

			const cookie = new Cookie("access_token", token, {
				httpOnly: true,
				secure: env.NODE_ENV === "production",
				sameSite: "strict",
			});

			return Response.json(
				{ user, token },
				{ headers: { "Set-Cookie": cookie.serialize() }, status: 200 },
			);
		} catch (error) {
			if (error instanceof ValidationError) {
				return Response.json({ message: error.message }, { status: 400 });
			}

			if (error instanceof InvalidCredentialsError) {
				return Response.json({ message: error.message }, { status: 401 });
			}

			return Response.json(
				{ message: new GenericLoginError().message },
				{ status: 500 },
			);
		}
	};
}
