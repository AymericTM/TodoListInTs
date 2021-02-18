import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from './components/Container';
import Todo from './pages/Todo';

function App() {
    return (
        <Container>
            <Router>
                <Route exact path="/" component={Todo} />
                <Route path="/prova" component={() => <></>} />
            </Router>
        </Container>
    );
}

export default App;
