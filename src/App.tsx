import { useState, useEffect } from "react";
import Login from "./components/Login";
import Board from "./components/Board";
import { BoardData } from "./types";
import Cookies from "js-cookie";

function App() {
  const [board, setBoard] = useState<BoardData | null>(null);
  const [savedBoards, setSavedBoards] = useState<BoardData[]>([]);

  // Funkcja do załadowania zapisanych tablic z cookies
  const loadSavedBoards = () => {
    const saved = Cookies.get("task-manager-boards");
    if (saved) {
      setSavedBoards(JSON.parse(saved));
    }
  };

  // Funkcja do zapisania tablic w cookies
  const saveBoardsToCookies = (boards: BoardData[]) => {
    Cookies.set("task-manager-boards", JSON.stringify(boards), { expires: 7 });
  };

  // Funkcja do dodania nowego użytkownika lub aktualizacji istniejącego
  const addNewBoard = (newBoard: BoardData) => {
    const updatedBoards = [
      newBoard,
      ...savedBoards.filter((b) => b.username !== newBoard.username), // Usuń istniejący rekord o tym samym username
    ];
    setSavedBoards(updatedBoards);
    saveBoardsToCookies(updatedBoards);
    setBoard(newBoard); // Ustaw nową tablicę jako aktywną
  };

  // Funkcja do aktualizacji konkretnego rekordu w zapisanych tablicach
  const updateBoard = (updatedBoard: BoardData) => {
    const updatedBoards = [
      updatedBoard,
      ...savedBoards.filter((b) => b.username !== updatedBoard.username), // Usuń istniejący rekord o tym samym username
    ];
    setSavedBoards(updatedBoards);
    saveBoardsToCookies(updatedBoards);
    setBoard(updatedBoard); // Aktualizuj bieżący stan tablicy
  };

  // Funkcja do usuwania rekordu
  const deleteBoard = (username: string) => {
    const updatedBoards = savedBoards.filter((b) => b.username !== username);
    setSavedBoards(updatedBoards);
    saveBoardsToCookies(updatedBoards);
    if (board?.username === username) {
      setBoard(null); // Wyloguj użytkownika, jeśli usunięto jego tablicę
    }
  };

  // Załaduj zapisane tablice przy pierwszym renderze
  useEffect(() => {
    loadSavedBoards();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {!board ? (
        <Login
          onLogin={addNewBoard}
          savedBoards={savedBoards}
          onDeleteBoard={deleteBoard} // Przekazanie funkcji usuwania
        />
      ) : (
        <Board boardData={board} onUpdateBoardData={updateBoard} />
      )}
    </div>
  );
}

export default App;
