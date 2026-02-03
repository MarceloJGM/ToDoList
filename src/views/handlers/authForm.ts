import {
    InvalidCredentialsError,
    UserAlreadyExistsError,
    ValidationError,
} from "@errors/index.ts";
import { fetchLogin, fetchRegister } from "@services/index.ts";
import { getFormData } from "@utils/index.ts";

export const handleLoginAuthForm = async (event: React.FormEvent) => {
    try {
        event.preventDefault();
        const { username, pwd } = getFormData({ event });
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
        const { username, pwd } = getFormData({ event });
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
