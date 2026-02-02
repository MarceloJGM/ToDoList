export class GenericUserCreationError extends Error {
	constructor(message: string = "Error creating user") {
		super(message);
		this.name = "GenericUserCreationError";
	}
}

export class GenericLoginError extends Error {
	constructor(message: string = "Error login") {
		super(message);
		this.name = "GenericLoginError";
	}
}

export class UserAlreadyExistsError extends Error {
	constructor(message: string = "The user already exists") {
		super(message);
		this.name = "UserAlreadyExistsError";
	}
}

export class InvalidCredentialsError extends Error {
	constructor(message: string = "Invalid credentials") {
		super(message);
		this.name = "InvalidCredentialsError";
	}
}

export class ValidationError extends Error {
	constructor(message: string = "Invalid data") {
		super(message);
		this.name = "ValidationError";
	}
}
