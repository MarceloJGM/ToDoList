import { Button } from "@components/Button.tsx";
import { useTaskStore } from "@stores/index.ts";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { handleTaskSubmit } from "../handlers";

export const TaskForm = () => {
    const createTask = useTaskStore((state) => state.createTask);
    const updateTask = useTaskStore((state) => state.updateTask);
    const editingTask = useTaskStore((state) => state.editingTask);
    const setEditingTask = useTaskStore((state) => state.setEditingTask);
    const setIsShowing = useTaskStore((state) => state.setIsShowing);
    const isShowing = useTaskStore((state) => state.isShowing);

    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setEditingTask({ input: null });
            setIsShowing();
            setIsExiting(false);
        }, 300);
    };

    useEffect(() => {
        if (!isShowing) {
            setIsExiting(false);
        }
    }, [isShowing]);

    return (
        <div
            className={`flex p-4 h-dvh w-full bg-black/60 fixed ${isExiting ? "animate-fade-out-up" : "animate-fade-in-up"} m-auto top-0 right-0 z-10 transition-all duration-300`}
        >
            <form
                className="flex flex-col items-center gap-4 w-fit m-auto p-4 rounded-md bg-surface"
                onSubmit={(event) => {
                    handleTaskSubmit({
                        event,
                        editingTask,
                        createTask,
                        updateTask,
                        handleClose,
                    });
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
                            className="p-2 rounded-xl outline-2 outline-border focus:outline-2 focus:outline-border-focus text-text-primary transition-all duration-300 bg-body-alt hover:outline-border-focus"
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
                            className="p-2 rounded-xl outline-2 outline-border focus:outline-2 focus:outline-border-focus text-text-primary transition-colors duration-300 bg-body-alt hover:outline-border-focus"
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
                        onClick={handleClose}
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
