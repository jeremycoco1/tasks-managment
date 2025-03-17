import { useState } from "react";

import "./App.css";
import Board from "./components/Board";

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
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: "TO DO",
    },
    {
      id: 2,
      title: "IN PROGRESS",
    },
    {
      id: 3,
      title: "DONE",
    },
  ]);
  const [tasks, setTasks] = useState<Task[]>([]);

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
      <div className="container">
        {boards.map((board) => (
          <Board
            key={board.id}
            title={board.title}
            idBoard={board.id}
            tasks={tasks.filter((task) => task.boardId === board.id) as Task[]} // 💡 Ajout de `as Task[]`
            moveTask={moveTask}
            setTasks={setTasks}
          />
        ))}
      </div>
    </>
  );
}

export default App;
