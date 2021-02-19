import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Container from './components/Container';
import Route from './components/Route';
import Login from './pages/Login';
import OneTodo from './pages/OneTodo';
import Register from './pages/Register';
import Todo from './pages/Todo';
import TodoApi from './pages/TodoApi';
import { request } from './utils';
import { GlobalContext, GlobalContextStateOptional, initialContextState } from './utils/context/Global';

function App() {
    const [context, setContext] = useState(initialContextState);

    const updateGlobalContext = (state: GlobalContextStateOptional) => {
        // context => {name : "pino" , surname : "pluto"}
        // state => {name : "pippo",authenticated : false}

        // {...context,...state}  => {name : "pino" , surname : "pluto"} => {name : "pippo" , surname : "pluto",authenticated : false}
        setContext({ ...context, ...state });
    };

    useEffect(() => {
        request('get', '/authentication/status')
            .then(data => updateGlobalContext({ authenticated: true, ...data }))
            .catch(err => {
                localStorage.removeItem('token');
                updateGlobalContext({ authenticated: false });
            });
    }, []);

    return (
        <GlobalContext.Provider value={{ ...context, updateGlobalContext }}>
            <Router>
                <Container>
                    <Route type="authenticated" exact path="/" component={Todo} />
                    <Route type="authenticated" exact path="/api" component={TodoApi} />
                    <Route type="authenticated" path="/api/:id" component={OneTodo} />

                    <Route type="notAuthenticated" path="/register" component={Register} />
                    <Route type="notAuthenticated" path="/login" component={Login} />
                </Container>
            </Router>
        </GlobalContext.Provider>
    );
}

export default App;
