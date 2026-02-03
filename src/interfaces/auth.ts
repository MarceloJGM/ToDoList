export interface IAuthPayload {
	username: string;
}
export interface IAuthStore {
	isLoggedIn: null | string;
	isLoading: boolean;
	error: string | undefined;
	checkAuth: () => Promise<void>;
}
