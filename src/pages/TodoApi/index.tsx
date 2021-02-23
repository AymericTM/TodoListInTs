import React, { useRef, useState, useEffect } from 'react';
import Task from '../../components/Task';
import { ITask, TodoI } from '../../type';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { request } from '../../utils';
import Modal from '../../components/Modal';

type FormElement = React.FormEvent<HTMLFormElement>;

function Todo() {
    // Page State
    const [newTask, setNewTask] = useState<string>('');
    const [tasks, setTasks] = useState<TodoI[]>([]);
    const [sharedTasks, setSharedTasks] = useState<TodoI[]>([]);
    const [reload, setReload] = useState(false);

    const taskInput = useRef<HTMLInputElement>(null);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<TodoI>();
    const [modalEmail, setModalEmail] = useState('');

    const onAddUserToTodo = () => {
        request('post', '/todo/share/', { _id: selectedTodo?._id, email: modalEmail })
            .then(() => {
                setShowModal(false);
                setSelectedTodo(undefined);
                setModalEmail('');
                setReload(!reload);
            })
            .catch(err => {});
    };

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();

        request('post', '/todo/create', { title: newTask })
            .then(data => setReload(!reload))
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
            .then(data => setTasks(data))
            .catch(() => {});

        request('get', '/todo/share/list')
            .then(data => setSharedTasks(data))
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
                                    <input
                                        className="has-text-grey-dark input is-rounded border"
                                        type="text"
                                        onChange={e => setNewTask(e.target.value)}
                                        value={newTask}
                                        ref={taskInput}
                                        autoFocus
                                    ></input>
                                    <br />
                                    <br />
                                    <div className="buttons is-right">
                                        <button className="bg-green-500 p-5">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br />
                        <div className="flex flex-row w-full">
                            <div className="w-1/2 px-2">
                                <h1 className="mb-5">Todo Personali</h1>
                                {tasks.map(task => {
                                    return (
                                        <div className="flex flex-row items-center border justify-between">
                                            <p className="px-5" key={task._id}>
                                                {task.title}
                                            </p>
                                            <div>
                                                <button
                                                    className="bg-blue-400 hover:bg-blue-600 px-5 py-2"
                                                    onClick={() => {
                                                        setSelectedTodo(task);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Condividi
                                                </button>
                                                <Link to={`/api/` + task._id} className="bg-green-400 hover:bg-green-600 px-5 py-2 h-full">
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
                            <div className="w-1/2 px-2">
                                <h1 className="mb-5">Todo Condivise</h1>
                                <div>
                                    {sharedTasks.map(task => {
                                        return (
                                            <div className="flex flex-row items-center border justify-between">
                                                <p className="px-5 py-2" key={task._id}>
                                                    {task.title}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal visible={showModal} onCloseRequest={() => setShowModal(false)}>
                <div className="bg-white w-full h-60 p-10 rounded-md">
                    <p>Inserisci Email</p>
                    <input type="email" className="border" value={modalEmail} onChange={e => setModalEmail(e.target.value)} />
                    <button onClick={onAddUserToTodo}>Aggiungi</button>
                </div>
            </Modal>
        </>
    );
}

export default Todo;
