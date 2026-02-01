import { InvalidCredentialsError } from "@errors/index.ts";
import { fetchLogin } from "@services/index.ts";

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
