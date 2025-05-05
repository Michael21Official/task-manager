export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: string;
    priority?: "low" | "medium" | "high";
    important?: boolean;
    columnId?: string; // Added columnId property
}

export type ColumnType = {
    id: string;
    title: string;
    tasks: Task[];
};

export type BoardData = {
    username: string;
    columns: ColumnType[];
};

export interface TaskCardProps {
    task: Task;
    columns: ColumnType[];
    deleteTask: (taskId: string) => void;
    updateTask: (updatedTask: Task) => void;
}


