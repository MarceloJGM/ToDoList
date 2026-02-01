export interface IAuthPayload {
	id: string;
	username: string;
}
export interface IAuthStore {
	isLoggedIn: null | IAuthPayload;
	isLoading: boolean;
	error: string | undefined;
	checkAuth: () => Promise<void>;
}
