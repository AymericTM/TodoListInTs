import React, { useRef, useState, useEffect } from 'react';
import Task from '../../components/Task';
import { ITask, TodoI } from '../../type';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { request } from '../../utils';

type FormElement = React.FormEvent<HTMLFormElement>;

function Todo() {
    const [newTask, setNewTask] = useState<string>('');
    const [tasks, setTasks] = useState<TodoI[]>([]);
    const [reload, setReload] = useState(false);

    const taskInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();

        request('post', '/todo/create', { title: newTask })
            .then(data => {
                setReload(!reload);
            })
            .catch(err => {});
    };

    const onDeleteClick = (_id: string) => {
        request('post', '/todo/delete', { _id: _id })
            .then(() => setReload(!reload))
            .catch(err => {});
    };

    /* const onEditClick = (_id: string) => {}; */

    useEffect(() => {
        request('get', '/todo/list')
            .then(data => {
                setTasks(data);
            })
            .catch(() => {});
    }, [reload]);

    return (
        <>
            <div className="container mx-auto">
                <div className="columns is-centered">
                    <div className="column is-narrow">
                        <div className="card">
                            <div className="card-content is-rounded">
                                <p className="title is-3 has-text-centered">Task Form</p>
                                <form onSubmit={handleSubmit}>
                                    <input className="has-text-grey-dark input is-rounded" type="text" onChange={e => setNewTask(e.target.value)} value={newTask} ref={taskInput} autoFocus></input>
                                    <br />
                                    <br />
                                    <div className="buttons is-right">
                                        <button className="bg-green-500 p-5">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br />
                        <div className="w-1/2 mx-auto">
                            {tasks.map(task => {
                                return (
                                    <div className="flex flex-row items-center border justify-between">
                                        <p className="px-5" key={task._id}>
                                            {task.title}
                                        </p>
                                        <div>
                                            <Link to={`/api/` + task._id} className="bg-green-400 hover:bg-green-600 px-5 py-2" onClick={() => {}}>
                                                Modifica
                                            </Link>
                                            <button className="bg-red-400 hover:bg-red-600 px-5 py-2" onClick={() => onDeleteClick(task._id)}>
                                                Elimina
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;
