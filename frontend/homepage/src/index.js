import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login/Login';
import MainNav from './MainNav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import App from './App';

function Homepage () {
    return(
        <div>
            <Router>
                <MainNav/>

                <Switch>
                    <Route exact path="/">
                        <App />
                    </Route>

                    <Route exact path="/login">
                        <Login />
                    </Route>
                </Switch>
            </Router>
            
        </div>
    );
}

// ========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<Homepage />, rootElement);
  