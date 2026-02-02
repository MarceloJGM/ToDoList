import {
	InvalidCredentialsError,
	UserAlreadyExistsError,
	ValidationError,
} from "@errors/index.ts";
import { fetchLogin, fetchRegister } from "@services/index.ts";

export const handleLoginAuthForm = async (event: React.FormEvent) => {
	try {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const username = formData.get("username") as string;
		const pwd = formData.get("password") as string;

		await fetchLogin({ username, pwd });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			throw error;
		}

		throw error;
	}
};

export const handleRegisterAuthForm = async (event: React.FormEvent) => {
	try {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const username = formData.get("username") as string;
		const pwd = formData.get("password") as string;

		await fetchRegister({ username, pwd });
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}

		if (error instanceof UserAlreadyExistsError) {
			throw error;
		}

		throw error;
	}
};
