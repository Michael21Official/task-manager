import { useState } from "react";
import { ColumnType, Task } from "../types";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "./TaskCard";
import '../styles/Column.css';

type Props = {
    column: ColumnType;
    columns: ColumnType[];
    setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
    setDraggedTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export default function Column({ column, columns, setColumns, setDraggedTask }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const addTask = () => {
        if (newTaskTitle.trim()) {
            setColumns((prev) =>
                prev.map((col) =>
                    col.id === column.id
                        ? {
                            ...col,
                            tasks: [
                                ...col.tasks,
                                { id: uuidv4(), title: newTaskTitle, description: newTaskDescription, important: false },
                            ],
                        }
                        : col
                )
            );
            setNewTaskTitle("");
            setNewTaskDescription("");
            setIsModalOpen(false);
        }
    };

    const deleteTask = (taskId: string) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === column.id
                    ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
                    : col
            )
        );
    };

    const toggleImportant = (taskId: string) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === column.id
                    ? {
                        ...col,
                        tasks: col.tasks.map((task) =>
                            task.id === taskId ? { ...task, important: !task.important } : task
                        ),
                    }
                    : col
            )
        );
    };

    const moveTaskToColumn = (taskId: string, newColumnId: string) => {
        setColumns((prev) => {
            let movedTask: Task | undefined;
            // Usuń zadanie ze starej kolumny
            const newColumns = prev.map((col) => {
                if (col.id === column.id) {
                    const filteredTasks = col.tasks.filter((task) => {
                        if (task.id === taskId) {
                            movedTask = { ...task, columnId: newColumnId };
                            return false;
                        }
                        return true;
                    });
                    return { ...col, tasks: filteredTasks };
                }
                return col;
            });
            // Dodaj zadanie do nowej kolumny
            if (movedTask) {
                return newColumns.map((col) =>
                    col.id === newColumnId
                        ? { ...col, tasks: [...col.tasks, movedTask!] }
                        : col
                );
            }
            return newColumns;
        });
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>+ Zadanie</button>
            {column.tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    columns={columns}
                    deleteTask={deleteTask}
                    updateTask={(updatedTask) => {
                        setColumns((prev) =>
                            prev.map((col) =>
                                col.id === column.id
                                    ? {
                                        ...col,
                                        tasks: col.tasks.map((t) =>
                                            t.id === updatedTask.id ? updatedTask : t
                                        ),
                                    }
                                    : col
                            )
                        );
                    }}
                    changeColumn={moveTaskToColumn} // Dodaj to!
                />
            ))}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Dodaj nowe zadanie</h3>
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Nazwa zadania"
                        />
                        <textarea
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            placeholder="Opis zadania"
                        />
                        <div className="modal-actions">
                            <button onClick={addTask}>Dodaj</button>
                            <button onClick={() => setIsModalOpen(false)}>Anuluj</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}