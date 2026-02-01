import { InvalidTokenError, NoTokenError } from "@errors/index.ts";
import axios from "axios";

const authApiClient = axios.create({
    baseURL: new URL("/api/auth", location.origin).toString(),
    timeout: 10000,
    withCredentials: true,
});

authApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status } = error.response;

        if (status === 498) {
            throw new NoTokenError();
        }
    },
);

export const fetchAuth = async () => {
    try {
        const request = await authApiClient.get("/session");
        const { data } = request;
        return data.payload;
    } catch (error) {
        if (error instanceof NoTokenError) {
            throw error;
        }

        throw new InvalidTokenError();
    }
};

export const fetchLogout = async () => {
    try {
        const request = await authApiClient.get("/logout");
        const { data } = request;
        return data;
    } catch (_error) {
        return;
    }
};
