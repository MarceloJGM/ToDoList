import type { ITaskStore } from "@interfaces/index.ts";
import {
	fetchAllTasks,
	fetchDeleteTask,
	fetchUpdateTask,
} from "@services/index.ts";
import { create } from "zustand";

export const useTaskStore = create<ITaskStore>()((set, get) => ({
	allTasks: [],
	editingTask: null,
	isShowing: false,
	setIsShowing: () => set((state) => ({ isShowing: !state.isShowing })),

	setEditingTask: ({ input }) => set({ editingTask: input }),

	getAllTasks: async () => {
		const newAllTasks = await fetchAllTasks();
		set({ allTasks: newAllTasks });
	},

	updateTask: async ({ id, input }) => {
		await fetchUpdateTask({ id, input });
		get().getAllTasks();
	},

	deleteTask: async ({ id }) => {
		await fetchDeleteTask({ id });
		get().getAllTasks();
	},
}));
