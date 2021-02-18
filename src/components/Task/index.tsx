import React, { useState, useEffect, useContext } from 'react';
import { ITask } from '../../type';

interface TaskProp {
    className?: string;
    task: ITask;

    onDelete: () => void;
    onToggle: () => void;
}

function Task({ className = '', onDelete, onToggle, task }: TaskProp) {
    return (
        <div className="card-footer-item">
            <p className="subtitle is-5 " style={{ textDecoration: task.done ? 'line-through' : '' }}>
                {task.name}
            </p>
            <div className="buttons is-right">
                <button className="button is-link is-light is-rounded is-small" onClick={() => onToggle()}>
                    {task.done ? '✅' : '❌'}
                </button>
                <button className="button is-danger is-rounded is-small" onClick={() => onDelete()}>
                    🗑
                </button>
            </div>
        </div>
    );
}

export default Task;
