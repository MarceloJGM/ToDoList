export class GettingUserTasksError extends Error {
    constructor(message: string = "Error getting user tasks") {
        super(message);
        this.name = "GettingUserTasksError";
    }
}

export class TaskNotFoundError extends Error {
    constructor(message: string = "Task not found") {
        super(message);
        this.name = "TaskNotFoundError";
    }
}

export class CreatingTaskError extends Error {
    constructor(message: string = "Error creating task") {
        super(message);
        this.name = "CreatingTaskError";
    }
}

export class UpdatingTaskError extends Error {
    constructor(message: string = "Error updating task") {
        super(message);
        this.name = "UpdatingTaskError";
    }
}

export class DeletingTaskError extends Error {
    constructor(message: string = "Error deleting task") {
        super(message);
        this.name = "DeletingTaskError";
    }
}
