import type { EnvVariables } from "@interfaces/index.ts";
import { env } from "bun";

export const JWT_SIGNATURE_ALGORITHM = "HS256";

export const JWT_SECRET_KEY = new TextEncoder().encode(
	(env as unknown as EnvVariables).JWT_SECRET_KEY,
);
