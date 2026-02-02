import { InvalidTokenError, NoTokenError } from "@errors/index.ts";
import type { IAuthStore } from "@interfaces/index.ts";
import { fetchAuth } from "@services/index.ts";
import { create } from "zustand";

export const useAuthStore = create<IAuthStore>()((set) => ({
	isLoggedIn: null,
	isLoading: true,
	error: undefined,

	checkAuth: async () => {
		try {
			const logged = await fetchAuth();
			set({ isLoggedIn: logged, isLoading: false, error: undefined });
		} catch (error) {
			if (error instanceof NoTokenError) {
				set({ isLoggedIn: null, isLoading: false, error: error.message });
				return;
			}
			set({
				isLoggedIn: null,
				isLoading: false,
				error: new InvalidTokenError().message,
			});
		}
	},
}));
