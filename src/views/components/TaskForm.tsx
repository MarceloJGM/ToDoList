import { Button } from "@components/Button.tsx";
import { useTaskStore } from "@stores/index.ts";
import { IconCheck, IconX } from "@tabler/icons-react";
import { fetchCreateTask, fetchUpdateTask } from "../services";

export const TaskForm = () => {
    const getAllTasks = useTaskStore((state) => state.getAllTasks);
    const editingTask = useTaskStore((state) => state.editingTask);
    const setEditingTask = useTaskStore((state) => state.setEditingTask);
    const setIsShowing = useTaskStore((state) => state.setIsShowing);
    return (
        <div className="flex p-4 h-dvh w-full bg-black/60 fixed animate-delay-50 animate-in fade-in m-auto top-0 right-0 z-10">
            <form
                className="flex flex-col items-center gap-4 w-fit m-auto p-4 rounded-md bg-surface"
                onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const title = formData.get("title") as string;
                    const description = formData.get("description") as string;
                    editingTask
                        ? await fetchUpdateTask({
                            id: editingTask.id,
                            input: { title: title, description: description },
                        })
                        : await fetchCreateTask({
                            input: { title: title, description: description },
                        });
                    setEditingTask({ input: null });
                    setIsShowing();
                    getAllTasks();
                }}
            >
                <h2 className="text-h2-responsive text-text-primary">
                    {editingTask ? "Edit Task" : "Create Task"}
                </h2>
                <section className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-text-primary">Title</span>
                        <input
                            defaultValue={editingTask?.title ? editingTask.title : ""}
                            className="p-2 rounded-xl outline-2 outline-border focus:outline-2 focus:outline-secondary text-text-primary transition-all"
                            name="title"
                            type="text"
                            required
                            placeholder="Create the slides"
                            maxLength={60}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-text-primary">Description (Optional)</span>
                        <textarea
                            defaultValue={
                                editingTask?.description ? editingTask.description : ""
                            }
                            className="p-2 rounded-xl outline-2 outline-border text-text-primary resize-none focus:outline-2 focus:outline-secondary transition-all"
                            name="description"
                            rows={5}
                            placeholder="..."
                            maxLength={120}
                        ></textarea>
                    </label>
                </section>

                <section className="flex gap-2">
                    <Button
                        type="button"
                        className="flex items-center p-2 rounded-md bg-error cursor-pointer hover:opacity-90 transition-opacity"
                        text="Cancel"
                        icon={<IconX />}
                        onClick={() => {
                            setEditingTask({ input: null });
                            setIsShowing();
                        }}
                    />
                    <Button
                        type="submit"
                        className="flex items-center p-2 rounded-md bg-secondary cursor-pointer hover:opacity-90 transition-opacity"
                        text="Accept"
                        icon={<IconCheck />}
                    />
                </section>
            </form>
        </div>
    );
};
