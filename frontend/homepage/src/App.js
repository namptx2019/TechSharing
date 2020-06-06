import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './Slider/Slider';
import RadientBackground from './RadientBackground/RadientBackground';
import PopularCategories from './PopularCategories/PopularCategories';

const App = () => {
    return(
        <div>
            <RadientBackground/>
            <Slider/>
            <hr></hr>
            <PopularCategories/>
        </div>
    );
}

export default App;