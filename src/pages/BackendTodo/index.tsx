import React, { useRef, useState, useEffect } from "react";
import Task from "../../components/Task";
import { ITask, TodoI } from "../../type";
import axios from "axios";
import { Link } from "react-router-dom";
import { request } from "../../Utils";
import Modal from "../../components/modale";
type FormElement = React.FormEvent<HTMLFormElement>;

function Todo() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<TodoI[]>([]);
  const [shareTask, setShareTasks] = useState<TodoI[]>([]);
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const taskInput = useRef<HTMLInputElement>(null);
  const [selectedTRodo, setSelectedTodo] = useState<TodoI>();
  const [modolEmail, setModalEmail] = useState("");
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    request("post", "/todo/create/", { title: newTask })
      .then((data) => {
        console.log(data);
        setReload(!reload);
      })
      .catch((err) => {});
  };
  const onShareTodo = () => {
    request("post", "/todo/share/", {
      _id: selectedTRodo?._id,
      email: modolEmail,
    })
      .then(() => {
        setShowModal(false);
        setSelectedTodo(undefined);
        setModalEmail("");
        setReload(!reload);
      })
      .catch(() => {});
  };
  const onDeleteClick = (_id: string) => {
    request("post", "/todo/delete/", { _id: _id }).then((data) => {
      console.log(data);
      setReload(!reload);
    });
  };

  useEffect(() => {
    request("get", "/todo/list")
      .then((data) => {
        setTasks(data);
      })
      .catch(() => {});
    request("get", "/todo/share/list").then((data) => {
      setShareTasks(data);
    });
  }, [reload]);

  return (
    <>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-narrow">
            <div className="card">
              <div className="card-content is-rounded">
                <p className="title is-6 has-text-centered font-black">
                  Task Form
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    type="text"
                    placeholder="Click here"
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    ref={taskInput}
                    autoFocus
                  ></input>
                  <br />
                  <br />
                  <div className="buttons is-right">
                    <button className="bg-green-500 p-5group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Add task
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <div className="grid grid-cols-6 gap-4">
              <div className="col-start-1 col-end-3">
                <label className="title is-6 has-text-centered font-black">
                  Le mie task :
                </label>
                {tasks.map((task) => {
                  return (
                    <div>
                      <li className="text-2xl" key={task._id}>
                        {task.title}
                      </li>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => onDeleteClick(task._id)}
                      >
                        Delete
                      </button>
                      <Link
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                        to={"/api/" + task._id}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedTodo(task);
                          setShowModal(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Share
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="col-end-7 col-span-2">
                <label className="title is-6 has-text-centered font-black">
                  Task condivise :
                </label>
                {shareTask.map((shareTask) => {
                  return (
                    <li className="text-1xl" key={shareTask._id}>
                      <p className="text-2xl">{shareTask.title}</p>
                      <b> creato il </b>
                      {shareTask.created}
                    </li>
                  );
                })}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        visible={showModal}
        onCloseRequest={() => {
          setShowModal(false);
        }}
      >
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <p>Inserisci email amico</p>
          </div>
          <div className="bg-gray-200 w-full flex flex-col items-center">
            <div className="pt-4">
              <input
                className="p-3 text-gray-500 rounded-xl resize-none"
                type="text"
                value={modolEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                placeholder="Email"
              ></input>
              <button
                className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                onClick={onShareTodo}
              >
                Add friend
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Todo;
