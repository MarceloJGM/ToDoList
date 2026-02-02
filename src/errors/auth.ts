export class InvalidTokenError extends Error {
	constructor(message: string = "Invalid token") {
		super(message);
		this.name = "InvalidTokenError";
	}
}

export class NoTokenError extends Error {
	constructor(message: string = "No Token") {
		super(message);
		this.name = "NoTokenError";
	}
}
