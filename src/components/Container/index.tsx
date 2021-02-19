import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../Utils';
import { GlobalContext, initialContextState } from '../../Utils/Context/GlobalContext';

interface ContainerProp {
    className?: string;
    children: any;
}

function Container({ className = '', children }: ContainerProp) {

    const { authenticated, updateGlobalContext, email, name, surname, id } = useContext(GlobalContext);
    const onLogout = () => {
        request('post', '/authentication/logout-all')
            .then(() => {
                localStorage.removeItem('token');
                updateGlobalContext({ ...initialContextState, authenticated: false });
            })
    }
    return (
        <>
            <div className="container mx-auto">
                <nav className="  w-full bg-red-400 h-20 rounded-2xl">
                    {authenticated && (
                        <>
                            <Link to='/api'>TodoOnline   </Link>
                            <button onClick={onLogout}>Logout</button>
                        </>
                    )}

                    {!authenticated && (
                        <>
                            <p className=" flex justify-end p-4">
                                <Link to='/register' className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Registrati</Link>
                            </p>
                        </>
                    )}

                </nav>
                {children}
            </div>
        </>
    );
}

export default Container;
