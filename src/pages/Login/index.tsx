import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormLoginI } from '../../type';
import { request } from '../../utils';
import { GlobalContext } from '../../utils/context/Global';

function Login() {
    const [loginInfo, setLoginInfo] = useState<FormLoginI>({ email: '', password: '', remember: false });
    const { updateGlobalContext } = useContext(GlobalContext);

    const onValueChange = (e: any, field: string) => {
        const text = e.target.value;
        setLoginInfo({ ...loginInfo, [field]: text });
    };

    const onFormSubmit = (e: any) => {
        e.preventDefault();

        let body: any = { ...loginInfo };
        body.remember = loginInfo.remember ? 'yes' : 'no';

        request('post', '/authentication/login', body)
            .then(data => {
                const token = data.token;

                localStorage.setItem('token', token);
                updateGlobalContext({ ...data, authenticated: true });
            })
            .catch(err => {});
    };

    return (
        <>
            <form className="flex flex-col" onSubmit={onFormSubmit}>
                <input required placeholder="Email" type="text" className="border py-2 px-2" value={loginInfo.email} onChange={e => onValueChange(e, 'email')} />
                <input required placeholder="Password" type="password" className="border py-2 px-2" value={loginInfo.password} onChange={e => onValueChange(e, 'password')} />
                <div>
                    Remember
                    <input type="checkbox" checked={loginInfo.remember} className="border py-2 px-2 ml-3" onClick={() => setLoginInfo({ ...loginInfo, remember: !loginInfo.remember })} />
                </div>

                <button className="border focus:border-blue-600 bg-blue-500 py-2 hover:bg-blue-900" type="submit">
                    Login
                </button>
                <Link to="/register">Registrati</Link>
            </form>
        </>
    );
}

export default Login;
