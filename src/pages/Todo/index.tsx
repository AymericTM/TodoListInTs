import React, { useRef, useState } from "react";
import Task from "../../components/Task";
import { ITask } from "../../type";
type FormElement = React.FormEvent<HTMLFormElement>;

function Todo() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    //console.log(newTask);
    //console.log(tasks);
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    if (name.trim().length >= 3) {
      setTasks(newTasks);
    } else {
      alert("Il task deve contenere 3 o più caratteri validi");
    }
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
    taskInput.current?.focus();
  };

  const deleteTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
    taskInput.current?.focus();
  };

  const shareTask = (i: number): void => {
    alert(i);
  };

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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    type="text"
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    ref={taskInput}
                    placeholder="Add task"
                    autoFocus
                  ></input>
                  <br />
                  <br />
                  <div className="buttons is-right">
                    <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Add task
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <br />
            {tasks.map((t: ITask, i: number) => {
              return (
                <Task
                  key={i}
                  task={t}
                  onDelete={() => deleteTask(i)}
                  onToggle={() => toggleDoneTask(i)}
                  onShare={() => shareTask(i)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
