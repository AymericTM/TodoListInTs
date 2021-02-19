import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { FormLogin } from '../../type';
import { request } from '../../Utils';
import { GlobalContext } from '../../Utils/Context/GlobalContext';

export default function Login() {
    const [loginInfo, setLoginInfo] = useState<FormLogin>({ email: '', password: '', remember: false });
    const { updateGlobalContext } = useContext(GlobalContext);
    const onValueChange = (e: any, field: string) => {
        const text = e.target.value;
        setLoginInfo({ ...loginInfo, [field]: text });
    }
    const onFormSubmit = (e: any) => {
        e.preventDefault();

        let body: any = { ...loginInfo };
        body.remember = loginInfo.remember ? 'yes' : 'no';


        request('post', '/authentication/login', body)

            .then(data => {

                const token = data.token;
                localStorage.setItem('token', token);
                updateGlobalContext({ ...data, authenticated: true });
                console.log(data);

            })
    }
    return <>
        <div className=" flex justify-center p-3">
            <form onSubmit={onFormSubmit} >
                <label className="block">
                    <span className="text-gray-700">Email</span>
                    <input required className='form-input mt-1 block w-full' type='text' placeholder="insert email" value={loginInfo.email} onChange={e => onValueChange(e, 'email')}></input> <br />
                </label>

                <label className="block">
                    <span className="text-gray-700">Password</span>
                    <input required className="form-input mt-1 block w-full" type='password' placeholder="insert password" value={loginInfo.password} onChange={e => onValueChange(e, 'password')}></input> <br />
                </label>

                <input className="form-checkbox" type="checkbox" checked={loginInfo.remember} onClick={() => setLoginInfo({ ...loginInfo, remember: !loginInfo.remember })}></input>Rimani Loggato
               <br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center" type="submit">Invia</button>
            </form>

        </div>

    </>;
}