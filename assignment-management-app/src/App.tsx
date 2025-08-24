import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Assignments from './pages/Assignments';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import Notification from './components/Notification';
import './styles/main.css';

const App = () => {
    return (
        <Router>
            <div>
                <Notification />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/assignments" component={Assignments} />
                    <Route path="/account" component={Account} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;