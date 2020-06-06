import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import backgroundimg from '../static/images/bg-desk.svg';


const RadientBackground = () => {
    return(
        <div className="background" style={{backgroundImage: backgroundimg}}></div>
    );
}

export default RadientBackground;