import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";


import "./cardTasks.css";
interface CardTasksProps {
  data: Task;
  handleTask: (id: number) => void;
  delet: (id: number) => void;
  editTask: (task: Task) => void;
}
const CardTasks: React.FC<CardTasksProps> = ({ data, handleTask, delet ,editTask}) => {
  return (
    <div className="task-contenair">
      
      <button className="task" onClick={() => handleTask(data.id)}>
        <div className="wrapp-content">
        <span className="title">{data.title}</span>
        <span className="content">{data.text}</span>
        </div>
        <div className="wrapp-valid">
        <span>{data.completed
          ? String.fromCharCode(9989)
          : String.fromCharCode(0x23f3)}</span>
          </div>
      </button>
      <div className="edit-del">
        <button
          style={{
            backgroundColor: "beige",
            border: "none",
            cursor: "pointer",
            width: "30px",
            borderRadius: "5px",
          }}
          onClick={() => editTask(data)}
        >
          <i className="fas fa-edit edit-icon"></i>
        </button>
        <button
          style={{
            backgroundColor: "beige",
            border: "none",
            cursor: "pointer",
            width: "30px",
            borderRadius: "5px",
          }}
          onClick={() => delet(data.id)}
        >
          <i className="fas fa-trash del-icon"></i>
        </button>
        
      </div>
    </div>
  );
};

export default CardTasks;
