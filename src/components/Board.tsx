import { useState, useEffect } from "react";
import { BoardData, ColumnType, Task } from "../types";
import Column from "./Column";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import '../styles/Board.css';

type Props = {
    boardData: BoardData;
    onUpdateBoardData: (updatedBoard: BoardData) => void;
};

export default function Board({ boardData, onUpdateBoardData }: Props) {
    const [columns, setColumns] = useState<ColumnType[]>(boardData.columns || []);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState("");

    const saveColumnsToCookies = (columns: ColumnType[]) => {
        const updatedBoard = { ...boardData, columns };
        Cookies.set("task-manager-columns", JSON.stringify(updatedBoard), { expires: 7 });
        onUpdateBoardData(updatedBoard);
    };

    useEffect(() => {
        setColumns(boardData.columns || []);
    }, [boardData]);

    useEffect(() => {
        saveColumnsToCookies(columns);
    }, [columns]);

    const addColumn = () => {
        if (newColumnTitle.trim()) {
            setColumns([...columns, { id: uuidv4(), title: newColumnTitle, tasks: [] }]);
            setNewColumnTitle("");
            setIsModalOpen(false);
        }
    };

    const removeColumn = (columnId: string) => {
        setColumns((prev) => prev.filter((col) => col.id !== columnId));
    };

    const handleDrop = (columnId: string) => {
        if (!draggedTask) return;

        setColumns((prev) =>
            prev.map((col) => {
                if (col.tasks.find((t) => t.id === draggedTask.id)) {
                    return { ...col, tasks: col.tasks.filter((t) => t.id !== draggedTask.id) };
                }
                return col;
            }).map((col) => {
                if (col.id === columnId) {
                    return { ...col, tasks: [...col.tasks, draggedTask] };
                }
                return col;
            })
        );

        setDraggedTask(null);
    };

    const handleTaskColumnChange = (taskId: string, newColumnId: string) => {
        setColumns((prev) =>
            prev.map((col) => ({
                ...col,
                tasks: col.tasks.filter((task) => task.id !== taskId),
            })).map((col) => {
                if (col.id === newColumnId) {
                    const taskToMove = prev
                        .flatMap((col) => col.tasks)
                        .find((task) => task.id === taskId);
                    if (taskToMove) {
                        return {
                            ...col,
                            tasks: [...col.tasks, { ...taskToMove, columnId: newColumnId }],
                        };
                    }
                }
                return col;
            })
        );
    };

    const getColumnStats = () => {
        return columns.map((col) => ({
            column: col.title,
            taskCount: col.tasks.length,
            importantCount: col.tasks.filter((task) => task.important).length,
        }));
    };

    const getImportantTaskCount = () => {
        return columns.reduce(
            (acc, col) => acc + col.tasks.filter((task) => task.important).length,
            0
        );
    };

    const getPriorityStats = () => {
        const stats = { low: 0, medium: 0, high: 0 };
        columns.forEach(col => {
            col.tasks.forEach(task => {
                if (task.priority) {
                    stats[task.priority]++;
                }
            });
        });
        return stats;
    };

    return (
        <div className="board-container">
            <div className="tasks-container">
                <div className="columns-container">
                    {columns.map((col) => (
                        <div
                            key={col.id}
                            className="column"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(col.id)}
                        >
                            <div className="column-header">
                                <h3>{col.title}</h3>
                                <button onClick={() => removeColumn(col.id)}>Usuń</button>
                            </div>
                            <Column
                                column={col}
                                columns={columns}
                                setColumns={setColumns}
                                setDraggedTask={setDraggedTask}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={() => setIsModalOpen(true)} className="add-column-button">+ Dodaj kolumnę</button>
            </div>

            <div className="board-stats">
                <h3>Statystyki</h3>
                <div className="stat-item">
                    <strong>Łączna liczba zadań: </strong>
                    {columns.reduce((acc, col) => acc + col.tasks.length, 0)}
                </div>
                <div className="stat-item">
                    <strong>Liczba ważnych zadań: </strong>
                    {getImportantTaskCount()}
                </div>
                <div className="stat-item">
                    <strong>Zadania wg priorytetu:</strong>
                    <div>Niski: {getPriorityStats().low}</div>
                    <div>Średni: {getPriorityStats().medium}</div>
                    <div>Wysoki: {getPriorityStats().high}</div>
                </div>

                <h4>Statystyki kolumn:</h4>
                {getColumnStats().map((stat) => (
                    <div className="stat-item" key={stat.column}>
                        <strong>{stat.column}:</strong> {stat.taskCount} zadań, {stat.importantCount} ważnych
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Dodaj nową kolumnę</h3>
                        <input
                            type="text"
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            placeholder="Nazwa kolumny"
                        />
                        <div className="modal-actions">
                            <button onClick={addColumn}>Dodaj</button>
                            <button onClick={() => setIsModalOpen(false)}>Anuluj</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}