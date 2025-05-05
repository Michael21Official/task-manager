import { useState } from "react";
import { BoardData } from "../types";
import "../styles/Login.css";

type Props = {
    onLogin: (data: BoardData) => void;
    savedBoards: BoardData[];
    onDeleteBoard: (username: string) => void; // Dodano funkcję usuwania
};

export default function Login({ onLogin, savedBoards, onDeleteBoard }: Props) {
    const [name, setName] = useState("");

    const handleLogin = () => {
        const board: BoardData = {
            username: name,
            columns: [
                { id: "todo", title: "To Do", tasks: [] },
                { id: "working", title: "Working", tasks: [] },
                { id: "done", title: "Done", tasks: [] },
            ],
        };
        onLogin(board);
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Zaloguj się</h2>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Twoje imię"
                />
                <button onClick={handleLogin}>Zaloguj się</button>
            </div>
            <div className="saved-boards">
                <h3>Zapisane tablice</h3>
                {savedBoards.length > 0 ? (
                    <ul>
                        {savedBoards.map((board, index) => (
                            <li key={index}>
                                <span>{board.username}</span>
                                <button onClick={() => onLogin(board)}>Otwórz</button>
                                <button onClick={() => onDeleteBoard(board.username)}>Usuń</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Brak zapisanych tablic</p>
                )}
            </div>
        </div>
    );
}
