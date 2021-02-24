import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { TodoI } from "../../type";
import { request } from "../../Utils";

export default function OneTodo(props: any) {
  const _id = props.match.params.id;

  const [todo, setTodo] = useState<TodoI>();

  console.log(_id);
  const onEdit = () => {
    request("post", "/todo/edit/", todo)
      .then((data) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    request("get", "/todo/info/" + _id)
      .then((todo) => {
        setTodo(todo);
      })
      .catch((err) => {});
  }, [_id]);

  return (
    <>
      {!todo && <p>Loading...</p>}
      {todo && (
        <>
          <label className="title is-6 has-text-centered font-black">
            Title Task
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            ></input>
          </label>
          <label className="title is-6 has-text-centered font-black">
            Description task
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
            ></input>
          </label>
          <label>
            Done :
            <input
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded "
              type="checkbox"
              checked={todo.done}
              onClick={() => setTodo({ ...todo, done: !todo.done })}
            ></input>
          </label>
          <div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={onEdit}
            >
              Modifica
            </button>
          </div>
        </>
      )}
    </>
  );
}
