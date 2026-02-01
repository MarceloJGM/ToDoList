import { Button } from "@components/Button.tsx";
import type { ITask } from "@interfaces/index.ts";
import { useTaskStore } from "@stores/index.ts";
import {
    IconEdit,
    IconSquareCheck,
    IconSquareCheckFilled,
    IconStar,
    IconStarFilled,
    IconTrash,
} from "@tabler/icons-react";
import { fetchTaskById } from "../services";

export const Task = ({ task }: { task: ITask }) => {
    const updateTask = useTaskStore((state) => state.updateTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);
    const setEditingTask = useTaskStore((state) => state.setEditingTask);
    const setIsShowing = useTaskStore((state) => state.setIsShowing);

    const { id, title, description, favorite, completed, createdAt, updatedAt } =
        task;

    const booleanFavorite = !!favorite;
    const booleanCompleted = !!completed;
    const createdDate = new Date(createdAt).toLocaleDateString();
    const updatedDate = new Date(updatedAt).toLocaleDateString();

    return (
        <article
            id={id}
            data-favorite={booleanFavorite}
            data-completed={booleanCompleted}
            className={`flex flex-wrap justify-between items-center p-2 gap-4 rounded-md bg-background ${completed ? " line-through opacity-60" : ""}`}
        >
            <section className="flex flex-col min-w-0 wrap-break-word text-wrap">
                <div>
                    <h3 className="text-text-primary text-h2-responsive">{title}</h3>
                    <span className="text-text-secondary">{description}</span>
                </div>
                <div className="flex gap-4 text-text-secondary">
                    <span>{createdDate}</span>
                    <span>{updatedDate}</span>
                </div>
            </section>
            <section className="flex justify-center items-center gap-2.5">
                <label className="hover:cursor-pointer hover:opacity-70">
                    {favorite ? (
                        <IconStarFilled size={32} color="#FFD700" />
                    ) : (
                        <IconStar size={32} color="#FFD700" />
                    )}
                    <input
                        hidden
                        checked={favorite}
                        type="checkbox"
                        onChange={() =>
                            updateTask({ id, input: { favorite: !booleanFavorite } })
                        }
                    />
                </label>
                <label className="hover:cursor-pointer hover:opacity-70">
                    {completed ? (
                        <IconSquareCheckFilled size={32} color="#4CAF50" />
                    ) : (
                        <IconSquareCheck size={32} color="#4CAF50" />
                    )}
                    <input
                        hidden
                        checked={completed}
                        type="checkbox"
                        onChange={() =>
                            updateTask({ id, input: { completed: !booleanCompleted } })
                        }
                    />
                </label>
                <Button
                    className="hover:cursor-pointer hover:opacity-70"
                    type="button"
                    icon={<IconEdit size={32} color="#2196F3 " />}
                    onClick={async () => {
                        setEditingTask({ input: await fetchTaskById({ id }) });
                        setIsShowing();
                    }}
                />
                <Button
                    className="hover:cursor-pointer hover:opacity-70"
                    type="button"
                    icon={<IconTrash size={32} color="#F44336" />}
                    onClick={() => deleteTask({ id })}
                />
            </section>
        </article>
    );
};
