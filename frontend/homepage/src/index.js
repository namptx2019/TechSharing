import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login/Login';
import MainNav from './MainNav';

function Homepage () {
    return(
        <div>
            <MainNav/>
            <Login/>
        </div>
    );
}

// ========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<Homepage />, rootElement);
  