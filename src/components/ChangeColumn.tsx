import { useState } from "react";
import { ColumnType } from "../types";
import "../styles/ChangeColumn.css";

type ChangeColumnProps = {
    taskId: string;
    columns: ColumnType[];
    changeColumn: (taskId: string, newColumnId: string) => void;
    currentColumnId: string; // Dodano bieżący identyfikator kolumny
};

const ChangeColumn = ({ taskId, columns, changeColumn, currentColumnId }: ChangeColumnProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleColumnChange = (newColumnId: string) => {
        changeColumn(taskId, newColumnId);
        setIsModalOpen(false); // Zamknij modal po wyborze kolumny
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Zmień kolumnę</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Wybierz kolumnę</h3>
                        <ul>
                            {columns
                                .filter((col) => col.id !== currentColumnId) // Wyklucz bieżącą kolumnę
                                .map((col) => (
                                    <li key={col.id}>
                                        <button onClick={() => handleColumnChange(col.id)}>
                                            {col.title}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>
                            Zamknij
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeColumn;