import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { TodoI } from '../../type';
import { request } from '../../utils';

function OneTodo(props: any) {
    const _id = props.match.params.id;

    const [todo, setTodo] = useState<TodoI>();

    const onEdit = () => {
        request('post', '/todo/edit', todo)
            .then(() => {})
            .catch(() => {});
    };

    useEffect(() => {
        request('get', '/todo/info/' + _id)
            .then(todo => {
                setTodo(todo);
            })
            .catch(err => {});
    }, [_id]);

    return (
        <>
            {!todo && <p>Loading...</p>}
            {todo && (
                <div>
                    <input className="border py-2 px-4" value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} />
                    <br />
                    Finita : <input type="checkbox" checked={todo.done} onClick={() => setTodo({ ...todo, done: !todo.done })} />
                    <br />
                    <button className="bg-green-400 py-2 px-4" onClick={onEdit}>
                        Modifica
                    </button>
                </div>
            )}
        </>
    );
}

export default OneTodo;
