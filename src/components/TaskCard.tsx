import { useState } from "react";
import { Task, TaskCardProps } from "../types";
import ChangeColumn from "./ChangeColumn";
import '../styles/TaskCard.css';

const TaskCard = ({ task, updateTask, deleteTask, columns, changeColumn }: TaskCardProps & { changeColumn: (taskId: string, newColumnId: string) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description || "");
    const [newDeadline, setNewDeadline] = useState(task.deadline || "");
    const [newPriority, setNewPriority] = useState(task.priority || "low");

    const handleSave = () => {
        updateTask({
            ...task,
            title: newTitle,
            description: newDescription,
            deadline: newDeadline,
            priority: newPriority,
        });
        setIsEditing(false);
    };

    const isOverdue = task.deadline && new Date(task.deadline) < new Date();

    return (
        <div className={`task-card ${task.important ? "important" : ""} ${isOverdue ? "overdue" : ""}`}>
            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div>
                        <label>
                            Nazwa zadania:
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Opis:
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Deadline:
                            <input
                                type="date"
                                value={newDeadline}
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Priorytet:
                            <select
                                value={newPriority}
                                onChange={(e) => setNewPriority(e.target.value as "low" | "medium" | "high")}
                            >
                                <option value="low">Niski</option>
                                <option value="medium">Średni</option>
                                <option value="high">Wysoki</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit">Zapisz</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Anuluj</button>
                </form>
            ) : (
                <>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <p>Deadline: {task.deadline}</p>
                    <p>Priorytet: {task.priority}</p>
                    <ChangeColumn
                        taskId={task.id}
                        columns={columns}
                        currentColumnId={task.columnId || ""}
                        changeColumn={changeColumn}
                    />
                    <button onClick={() => setIsEditing(true)}>Edytuj</button>
                    <button onClick={() => deleteTask(task.id)}>Usuń</button>
                </>
            )}
        </div>
    );
};

export default TaskCard;