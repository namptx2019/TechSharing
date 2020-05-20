import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Login from "./login";
import Register from "./Register";
import Nav from './components/Navigation';
import ApiService from './services/api.service'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";

ApiService.init(process.env.REACT_APP_API_URL);
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <div>
                <Nav/>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/main" component={Main} />
            </div>
        </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
