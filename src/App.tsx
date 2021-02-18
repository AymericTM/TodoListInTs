import React, { Fragment, useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([])

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('')
    //console.log(newTask);
    //console.log(tasks);
    taskInput.current?.focus();

  }

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    if (name.trim().length >= 3) {
      setTasks(newTasks)
    }else{
      alert('Il task deve contenere 3 o più caratteri validi')
    }
    
  }
  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
    taskInput.current?.focus();
  }
  const deleteTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
    taskInput.current?.focus();
  }

  return (
    <Fragment>

      <div className="container">
        <div className="columns is-centered">
          <div className="column is-narrow">
            <div className="card">
              <div className="card-content is-rounded">
                <p className="title is-3 has-text-centered">Task Form</p>
                <form onSubmit={handleSubmit}>
                  <input className="has-text-grey-dark input is-rounded"
                    type="text"
                    onChange={e => setNewTask(e.target.value)}
                    value={newTask}
                    ref={taskInput}
                    autoFocus></input>
                  <br />
                  <br />
                  <div className="buttons is-right">
                    <button className="button is-success is-rounded ">Save</button>
                  </div>
                </form>
              </div>
            </div>
            <br />
            {
              tasks.map((t: ITask, i: number) => {
                return <div className="card-footer-item" key={i}>

                  <p className="subtitle is-5 " style={{ textDecoration: t.done ? 'line-through' : '' }} >{t.name}</p>
                  <div className="buttons is-right" >
                    <button className="button is-link is-light is-rounded is-small" onClick={() => toggleDoneTask(i)}>
                      {t.done ? '✅' : '❌'}
                    </button>
                    <button className="button is-danger is-rounded is-small" onClick={() => deleteTask(i)}>
                      🗑
             </button>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </Fragment >
  );
}

export default App;
