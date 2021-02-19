import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { FormRegisterI } from '../../type';
import { request } from '../../utils';
import { GlobalContext } from '../../utils/context/Global';

function Register() {
    const [userInfo, setUserInfo] = useState<FormRegisterI>({ email: '', name: '', password: '', passwordConfirm: '', surname: '', tos: false });
    const { updateGlobalContext } = useContext(GlobalContext);

    const onFormSubmit = (e: any) => {
        e.preventDefault();

        request('post', '/authentication/signup', userInfo)
            .then(data => {
                const token = data.token;

                localStorage.setItem('token', token);
                updateGlobalContext({ ...data, authenticated: true });
            })
            .catch(err => {});
    };

    const onValueChange = (e: any, field: string) => {
        const text = e.target.value;
        setUserInfo({ ...userInfo, [field]: text });
    };

    return (
        <>
            <div>
                <form className="flex flex-col" onSubmit={onFormSubmit}>
                    <input required placeholder="Nome" type="text" className="border py-2 px-2" value={userInfo.name} onChange={e => onValueChange(e, 'name')} />
                    <input required placeholder="Cognome" type="text" className="border py-2 px-2" value={userInfo.surname} onChange={e => onValueChange(e, 'surname')} />
                    <input required placeholder="Email" type="text" className="border py-2 px-2" value={userInfo.email} onChange={e => onValueChange(e, 'email')} />
                    <input required placeholder="Password" type="password" className="border py-2 px-2" value={userInfo.password} onChange={e => onValueChange(e, 'password')} />
                    <input
                        required
                        placeholder="Password di Conferma"
                        type="password"
                        className="border py-2 px-2"
                        value={userInfo.passwordConfirm}
                        onChange={e => onValueChange(e, 'passwordConfirm')}
                    />
                    <div>
                        Tos
                        <input required type="checkbox" checked={userInfo.tos} className="border py-2 px-2 ml-3" onClick={() => setUserInfo({ ...userInfo, tos: !userInfo.tos })} />
                    </div>

                    <button type="submit" className="py-2 px-4 bg-blue-400 text-white">
                        Registrati
                    </button>
                </form>
            </div>
        </>
    );
}

export default Register;
