import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper';
import SeriesItem from './SeriesItem';
import 'swiper/css/swiper.css';


const PopularSeries = () => {

    const params = {
        slidesPerView: 5,
        spaceBetween: 30,
      }

    return(
        <section className="section-block">
            <div className="popular-series" id="homepagePopularSeries">
                <div className="container">
                    <div className="header-series">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="series-title">
                                <h2 className="title">Popular Series</h2>
                                <div className="primary left"><hr/></div>
                            </div>
                            <div className="custom-nav-owl" style={{fontSize: 'unset'}}>
                                <i className="prev icon-enter-tail-left"></i>
                                <i className="next icon-enter-tail-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-series">
                    <div className="list-series">
                        <Swiper {...params}>
                            <div>
                                <SeriesItem/>
                            </div>
                            <div>
                                <SeriesItem/>
                            </div>
                            <div>
                                <SeriesItem/>
                            </div>
                            <div>
                                <SeriesItem/>
                            </div>
                            <div>
                                <SeriesItem/>
                            </div>
                            <div>
                                <SeriesItem/>
                            </div>
                            <div>
                                <SeriesItem/>
                            </div>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PopularSeries;