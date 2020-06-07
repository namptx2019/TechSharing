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
import HomePage from './HomePage';
import MainFooter from './MainFooter';


function App () {
    return(
        <div>
            <Router>
                <MainNav/>

                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>

                    <Route exact path="/login">
                        <Login />
                    </Route>
                </Switch>

                <MainFooter/>
            </Router>
            
        </div>
    );
}

// ========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
  