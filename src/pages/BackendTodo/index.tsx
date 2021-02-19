import React, { useRef, useState, useEffect } from 'react';
import Task from '../../components/Task';
import { ITask, TodoI } from '../../type';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { request } from '../../Utils';
type FormElement = React.FormEvent<HTMLFormElement>;

function Todo() {
    const [newTask, setNewTask] = useState<string>('');
    const [tasks, setTasks] = useState<TodoI[]>([]);
    const [reload, setReload] = useState(false);

    const taskInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        request('post', '/todo/create/', { title: newTask })

            .then(data => {

                console.log(data);
                setReload(!reload);

            })
            .catch(err => { })
    };
    const onDeleteClick = (_id: string) => {
        request('post', '/todo/delete/', { _id: _id })

            .then(data => {

                console.log(data);
                setReload(!reload);

            })
    }




    useEffect(() => {
        request('get', '/todo/list')
            .then(data => {
                setTasks(data);
            })
            .catch(() => { });
    }, [reload])
    return (
        <>
            <div className="container">
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
                        {tasks.map(task => {
                            return (

                                <div>
                                    <p key={task._id}>{task.title}</p>
                                    <button onClick={() => onDeleteClick(task._id)}>Delete</button>
                                    <Link to={'/api/' + task._id} >Edit</Link>
                                    <Link to={'/share/' + task._id + '/' + task.title} >Share</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;
