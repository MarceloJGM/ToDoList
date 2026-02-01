import { GenericLoginError, InvalidCredentialsError } from "@errors/index.ts";
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

        throw new GenericLoginError();
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

        throw error;
    }
};
