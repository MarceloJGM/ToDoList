export interface ITask {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    favorite: boolean;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITaskCreateInput {
    title: string;
    description?: string | null;
    favorite?: boolean | undefined;
    completed?: boolean | undefined;
}

export interface ITaskUpdateInput {
    title?: string | undefined;
    description?: string | null | undefined;
    favorite?: boolean | undefined;
    completed?: boolean | undefined;
}

export interface ITaskModel {
    getAll: ({ user_id }: { user_id: ITask["user_id"] }) => Promise<ITask[]>;
    getById: ({
        id,
    }: {
        id: ITask["id"] | undefined;
    }) => Promise<ITask | undefined>;
    create: ({ input }: { input: ITaskCreateInput }) => Promise<boolean>;
    update: ({
        id,
        input,
    }: {
        id: string | undefined;
        input: ITaskUpdateInput;
    }) => Promise<boolean>;
    delete: ({ id }: { id: string | undefined }) => Promise<boolean>;
}

export interface ITaskStore {
    allTasks: ITask[] | [];
    editingTask: ITask | null;
    isShowing: boolean;
    setIsShowing: () => void;
    setEditingTask: ({ input }: { input: ITask | null }) => void;
    getAllTasks: () => void;
    updateTask: ({
        id,
        input,
    }: {
        id: ITask["id"];
        input: ITaskUpdateInput;
    }) => void;
    deleteTask: ({ id }: { id: ITask["id"] }) => void;
}
