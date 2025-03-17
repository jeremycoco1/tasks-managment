import { useState } from "react";

import "./App.css";
import Board from "./components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Board {
  id: number;
  title: string;
}
interface Task {
  id: number;
  title: string;
  text: string;
  boardId: number;
  completed: boolean;
}
function App() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  const addBoard = () => {
    if (boardTitle.trim() !== "") {
      setBoards((prev) => {
        const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
        return [...prev, { id: lastId + 1, title: boardTitle }];
      });
    }
    setBoardTitle(""); // Réinitialise l'input
    setIsInputVisible(false); // Cache l'input
  };
  const deletBoard = (boardId: number) => {
    setBoards((prev) => prev.filter((board) => board.id !== boardId));
  };

  const moveTask = (taskId: number, direction: "left" | "right") => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newBoardId =
            direction === "left" ? task.boardId - 1 : task.boardId + 1;
          if (newBoardId >= 1 && newBoardId <= 3) {
            return { ...task, boardId: newBoardId };
          }
        }
        return task;
      })
    );
  };
  return (
    <>
      <h1>MY TASKS</h1>
      {isInputVisible ? (
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          onBlur={addBoard} // Cache et ajoute le board quand on clique ailleurs
          onKeyDown={(e) => e.key === "Enter" && addBoard()} // Ajoute aussi avec "Enter"
          autoFocus
          placeholder="Nom du Board"
        />
      ) : (
        <button className="addB" onClick={() => setIsInputVisible(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      <div className="container">
        {boards.map((board) => (
          <Board
            key={board.id}
            title={board.title}
            idBoard={board.id}
            tasks={tasks.filter((task) => task.boardId === board.id) as Task[]} // 💡 Ajout de `as Task[]`
            deletB ={deletBoard}
            moveTask={moveTask}
            setTasks={setTasks}
          />
        ))}
      </div>
    </>
  );
}

export default App;
