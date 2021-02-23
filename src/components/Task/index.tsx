import React, { useState, useEffect, useContext } from "react";
import { ITask } from "../../type";

interface TaskProp {
  className?: string;
  task: ITask;

  onDelete: () => void;
  onToggle: () => void;
  onShare: () => void;
}

function Task({ className = "", onDelete, onToggle, onShare, task }: TaskProp) {
  return (
    <div className="card-footer-item">
      <p
        className="title is-6 has-text-centered font-black "
        style={{ textDecoration: task.done ? "line-through" : "" }}
      >
        {task.name}
      </p>
      <div className="buttons is-right">
        <button
          className="button is-link is-light is-rounded is-small"
          onClick={() => onToggle()}
        >
          {task.done ? "✅" : "❌"}
        </button>
        <button
          className="button is-danger is-rounded is-small"
          onClick={() => onDelete()}
        >
          🗑
        </button>
        <button
          className="button is-danger is-rounded is-small"
          onClick={() => onShare()}
        >
          🔗
        </button>
      </div>
    </div>
  );
}

export default Task;
