import React from "react";
import { useState } from "react";
import "./Board.css";
import CardTasks from "./CardTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
interface Task {
  id: number;
  title: string;
  text: string;
  boardId: number;
  completed: boolean;
}
interface BoardProps {
  title: string;
  idBoard: number;
  tasks: Task[];
  moveTask: (taskId: number, direction: "left" | "right") => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const Board: React.FC<BoardProps> = ({
  title,
  idBoard,
  tasks,
  moveTask,
  setTasks,
}) => {
  const [newTask, setNewTask] = useState({ title: "", text: "" });
  const [error, setError] = useState<string | null>(null);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const addTask = () => {
    if (newTask.title.trim() === "" || newTask.text.trim() === "") {
      setError("Please fill in both the title and content.");
      return;
    }
    const newTaskObj: Task = {
      id: Math.floor(Math.random() * 10000),
      title: newTask.title,
      text: newTask.text,
      boardId: idBoard,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask({ title: "", text: "" });
    setError(null);
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container-Board">
      <h2>{title}</h2>
      <div className="inputs-container">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={newTask.text}
          onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
          placeholder="Task content"
        />
        <button className="add" onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {tasks.map((task) => (
        <div className="wrapper" key={task.id}>
          {idBoard > 1 && (
            <button
              style={{ border: "none" }}
              onClick={() => moveTask(task.id, "left")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
          <CardTasks
            key={task.id}
            data={task}
            handleTask={toggleTask}
            delet={deleteTask}
          />
          {idBoard < 3 && (
            <button
              style={{ border: "none" }}
              onClick={() => moveTask(task.id, "right")}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
