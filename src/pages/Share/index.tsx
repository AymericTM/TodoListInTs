import React, { useRef, useState, useEffect } from 'react';
import Task from '../../components/Task';
import { ITask, TodoI } from '../../type';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { request } from '../../Utils';

export default function Share(props: any) {

    const _id = props.match.params.id;
    const title = props.match.params.title;


    const [todo, setTodo] = useState<TodoI>()

    console.log(_id);
    console.log(title);

    const onShare = () => {
        var personShare = prompt("Insert email to friend:", " ");
        //nella riga 22 ho creato nel back-end il path '/share' ma non mi sono riuscito nella query 
        request('post', '/todo/share/', todo)

            .then(data => { })
            .catch(err => { });
    }
    return (
        <>
            {!todo && <p>Loading...</p>}
            {todo && (
                <>
                    <form>
                        Task: <input type="text" value={todo.title} readOnly></input>

                        <button onClick={onShare}>Condividi</button>
                    </form>
                </>
            )}
        </>
    )
}