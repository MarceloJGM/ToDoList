import {
	GenericLoginError,
	GenericUserCreationError,
	InvalidCredentialsError,
	UserAlreadyExistsError,
	ValidationError,
} from "@errors/index.ts";
import type { IUserAuth } from "@interfaces/index.ts";
import axios from "axios";

const userApiClient = axios.create({
	baseURL: new URL("/api/users", location.origin).toString(),
	timeout: 10000,
	withCredentials: true,
});

userApiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const { status } = error.response;
		if (status === 401) {
			throw new InvalidCredentialsError();
		}

		if (status === 400) {
			throw new ValidationError();
		}

		if (status === 409) {
			throw new UserAlreadyExistsError();
		}
	},
);

export const fetchLogin = async ({ username, pwd }: IUserAuth) => {
	try {
		const request = await userApiClient.post("/login", { username, pwd });
		const { data } = request;
		return data;
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			throw error;
		}

		throw new GenericLoginError();
	}
};

export const fetchRegister = async ({ username, pwd }: IUserAuth) => {
	try {
		const request = await userApiClient.post("/register", { username, pwd });
		const { data } = request;
		return data;
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}

		if (error instanceof UserAlreadyExistsError) {
			throw error;
		}

		throw new GenericUserCreationError();
	}
};
