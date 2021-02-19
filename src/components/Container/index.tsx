import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../utils';
import { GlobalContext, initialContextState } from '../../utils/context/Global';

interface ContainerProp {
    className?: string;
    children: any;
}

function Container({ className = '', children }: ContainerProp) {
    const { authenticated, updateGlobalContext, email, id, surname, name } = useContext(GlobalContext);

    const onLogout = () => {
        request('post', '/authentication/logout-all').then(() => {
            localStorage.removeItem('token');
            updateGlobalContext({ ...initialContextState, authenticated: false });
        });
    };

    return (
        <>
            <div>
                <nav className="w-full bg-red-200 h-20 flex flex-row justify-between items-center">
                    {authenticated && (
                        <>
                            <p>Ciao {name + ' ' + surname}</p>
                            <Link to="/api">Todo Online</Link>

                            <button className="px-4 py-2" onClick={onLogout}>
                                Logout
                            </button>
                        </>
                    )}
                    {!authenticated && (
                        <>
                            <Link to="/register">Registrati</Link>
                        </>
                    )}
                </nav>
                {children}
            </div>
        </>
    );
}

export default Container;
