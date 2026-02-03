import type {
    ITask,
    ITaskCreateInput,
    ITaskUpdateInput,
} from "@interfaces/index.ts";

export const handleTaskSubmit = ({
    event,
    editingTask,
    updateTask,
    createTask,
    handleClose,
}: {
    event: React.FormEvent;
    editingTask: ITask | null;
    updateTask: ({
        id,
        input,
    }: {
        id: ITask["id"];
        input: ITaskUpdateInput;
    }) => void;
    createTask: ({ input }: { input: ITaskCreateInput }) => void;
    handleClose: () => void;
}) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    editingTask
        ? updateTask({
            id: editingTask.id,
            input: {
                title: title,
                description: description ? description : null,
            },
        })
        : createTask({
            input: {
                title: title,
                description: description ? description : null,
            },
        });
    handleClose();
};
