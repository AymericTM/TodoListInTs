import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "./components/Route";
import Container from "./components/Container";
import Todo from "./pages/Todo";
import BackendTodo from "./pages/BackendTodo";
import oneTodo from "./pages/oneTodo";
import Share from "./pages/Share";
import Register from "./pages/Register";
import Login from "./pages/Login/Login";
import {
  GlobalContext,
  GlobalContextOptional,
  initialContextState,
} from "./Utils/Context/GlobalContext";
import axios from "axios";
import { request } from "./Utils";
function App() {
  const [context, setContext] = useState(initialContextState);

  const updateGlobalContext = (state: GlobalContextOptional) => {
    setContext({ ...context, ...state });
  };

  useEffect(() => {
    request("get", "/authentication/status")
      .then((data) => {
        updateGlobalContext({ authenticated: true, ...data });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        updateGlobalContext({ authenticated: false });
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ ...context, updateGlobalContext }}>
      <Router>
        <Container>
          <Route
            type="notAuthenticated"
            path="/register"
            component={Register}
          />
          <Route type="notAuthenticated" path="/login" component={Login} />
          <Route type="authenticated" exact path="/" component={Todo} />
          <Route
            type="authenticated"
            exact
            path="/api"
            component={BackendTodo}
          />
          <Route type="authenticated" path="/api/:id" component={oneTodo} />
          <Route
            type="authenticated"
            path="/share/:id/:title"
            component={Share}
          />
        </Container>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
