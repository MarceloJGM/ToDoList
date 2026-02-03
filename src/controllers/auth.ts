import { JWT_SECRET_KEY } from "@config/index.ts";
import { InvalidTokenError, NoTokenError } from "@errors/index.ts";
import type { BunRequest } from "bun";
import * as jose from "jose";

export class AuthController {
    session = async (req: BunRequest) => {
        const token = req.cookies.get("access_token") || "";
        try {
            if (!token) {
                throw new NoTokenError();
            }

            const data = await jose.jwtVerify(token, JWT_SECRET_KEY);
            const { username } = data.payload;
            return Response.json({ payload: username }, { status: 200 });
        } catch (error) {
            if (error instanceof NoTokenError) {
                return Response.json({ message: error.message }, { status: 498 });
            }

            return Response.json(
                { message: new InvalidTokenError().message },
                { status: 500 },
            );
        }
    };

    logout = async (req: BunRequest) => {
        req.cookies.delete("access_token");
        return Response.json({ message: "Logged out" }, { status: 200 });
    };
}
