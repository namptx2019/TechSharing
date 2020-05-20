import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import StyledWrapper from "./Styles";
import Login from "./login";
import Register from "./Register";
import Nav from './components/Navigation';
import ApiService from './services/api.service'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

ApiService.init(process.env.REACT_APP_API_URL);
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <div>
                <Nav/>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
        </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
