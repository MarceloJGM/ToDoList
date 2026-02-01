import { Button, Task, TaskForm } from "@components/index.ts";
import { useAuthStore, useTaskStore } from "@stores/index.ts";
import { useEffect } from "react";

const Dashboard = () => {
    const allTasks = useTaskStore((state) => state.allTasks);
    const getAllTasks = useTaskStore((state) => state.getAllTasks);
    const editingTask = useTaskStore((state) => state.editingTask);
    const setEditingTask = useTaskStore((state) => state.setEditingTask);
    const isShowing = useTaskStore((state) => state.isShowing);
    const setIsShowing = useTaskStore((state) => state.setIsShowing);
    const payload = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        getAllTasks();
    }, [getAllTasks]);

    return (
        <main className="flex flex-col gap-4 p-4 grow">
            {isShowing && <TaskForm />}
            <h1>Dashboard</h1>
            <h2>Welcome, {payload?.username}!</h2>
            <details className="rounded-xl bg-card p-2 max-h-dvh overflow-auto">
                <summary className="text-h2-responsive p-2 rounded-xl text-text-primary ">
                    Favorites
                </summary>
                <section className="flex flex-col gap-2">
                    {allTasks.map(
                        (task) => !!task.favorite && <Task key={task.id} task={task} />,
                    )}
                </section>
            </details>
            <details className="rounded-xl bg-card p-2 max-h-dvh overflow-auto">
                <summary className="text-h2-responsive p-2 rounded-xl text-text-primary">
                    Normal
                </summary>
                <section className="flex flex-col gap-2 animate-fade-in">
                    {allTasks.map(
                        (task) => !task.favorite && <Task key={task.id} task={task} />,
                    )}
                </section>
            </details>
            <Button className="sticky bottom-5 bg-primary-light p-2 rounded-md" text="Add Task +" onClick={setIsShowing} type="button" />
        </main>
    );
};

export default Dashboard;
