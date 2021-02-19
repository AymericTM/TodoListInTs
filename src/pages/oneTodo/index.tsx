import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { TodoI } from '../../type';
import { request } from '../../Utils';

export default function OneTodo(props: any) {

    const _id = props.match.params.id;


    const [todo, setTodo] = useState<TodoI>()

    console.log(_id);
    const onEdit = () => {
        request('post', '/todo/edit/', todo)

            .then(data => { })
            .catch(err => { });
    }

    useEffect(() => {
        request('get', '/todo/info/' + _id)
            .then(todo => {
                setTodo(todo);
            })
            .catch(err => { });
    }, [_id]);





    return (
        <>
            {!todo && <p>Loading...</p>}
            {todo && (
                <>
                    <input value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} ></input>
                    <input type="checkbox" checked={todo.done} onClick={() => setTodo({ ...todo, done: !todo.done })}></input>
                    <button onClick={onEdit}>Modifica</button>
                </>
            )}
        </>
    )
}