import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './Slider/Slider';
import RadientBackground from './RadientBackground/RadientBackground';
import PopularCategories from './PopularCategories/PopularCategories';
import PopularSeries from './PopularSeries/PopularSeries';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import LatestPost from './posts/LatestPost';

const App = () => {
    return(
        <div>
            <RadientBackground/>
            <Slider/>
            <PopularCategories/>
            <PopularSeries/>
            <LeaderBoard/>
            <LatestPost/>
        </div>
    );
}

export default App;