import type { ITask } from "@interfaces/index.ts";
import { fetchAllTasks } from "@services/index.ts";
import { useEffect, useState } from "react";

export const useTask = () => {
	const [allTasks, setAllTasks] = useState<ITask[]>([]);

	useEffect(() => {
		const getAllTasks = async () => {
			const newAllTasks = await fetchAllTasks();
			setAllTasks(newAllTasks);
		};

		getAllTasks();
	}, []);

	return {
		allTasks,
		setAllTasks,
	};
};
