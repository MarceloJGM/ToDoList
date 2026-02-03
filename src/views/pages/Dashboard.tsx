import { Button, Task, TaskForm } from "@components/index.ts";
import { useAuthStore, useTaskStore } from "@stores/index.ts";
import { useEffect } from "react";

const Dashboard = () => {
    const allTasks = useTaskStore((state) => state.allTasks);
    const getAllTasks = useTaskStore((state) => state.getAllTasks);
    const isShowing = useTaskStore((state) => state.isShowing);
    const setIsShowing = useTaskStore((state) => state.setIsShowing);
    const payload = useAuthStore((state) => state.isLoggedIn);
    const username = payload ? payload : "";

    useEffect(() => {
        getAllTasks();
    }, [getAllTasks]);

    return (
        <main className="flex flex-col items-center grow gap-4 p-4 w-full max-w-300">
            {isShowing && <TaskForm />}
            <section className="flex flex-col w-full">
                <h2 className="text-h2-responsive text-text-primary">
                    Hello, <span>{username}!</span>
                </h2>
            </section>

            {!allTasks.length && <h1 className="text-h1-responsive text-text-primary m-auto">No tasks here :(</h1>}
            {!!allTasks.length && (
                <section className="flex flex-col gap-2 w-full">
                    <details className="rounded-xl bg-surface p-2 max-h-dvh overflow-auto border-2 border-light">
                        <summary className="text-h2-responsive p-2 rounded-xl text-text-primary">
                            Favorites
                        </summary>
                        <section className="flex flex-col gap-2 animate-fade-in-right">
                            {allTasks.map(
                                (task) => !!task.favorite && <Task key={task.id} task={task} />,
                            )}
                        </section>
                    </details>
                    <details className="rounded-xl bg-card p-2 max-h-dvh overflow-auto border-2 border-light">
                        <summary className="text-h2-responsive p-2 rounded-xl text-text-primary">
                            Normal
                        </summary>
                        <section className="flex flex-col gap-2 animate-fade-in-right">
                            {allTasks.map(
                                (task) => !task.favorite && <Task key={task.id} task={task} />,
                            )}
                        </section>
                    </details>
                </section>
            )}

            <Button
                className="cursor-pointer text-text-primary sticky bottom-5 bg-btn-primary hover:bg-btn-primary-hover hover:animate-jiggle transition-all duration-300 p-2 rounded-full w-full max-w-50"
                text="Add Task +"
                onClick={setIsShowing}
                type="button"
            />
        </main>
    );
};

export default Dashboard;
