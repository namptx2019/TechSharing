import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Swiper from 'react-id-swiper';

const Slider = () => {
    const params = {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
    }

    return(
        <div>
            <section className="slider-block" v-if="this.sliders != null">
                <div className="container">
                    <div className="slider">
                        <div className="status d-none d-sm-block">
                            <div className="title">Opening Content</div>
                            <hr className="underline"/>
                        </div>
                        <Swiper {...params}>
                            <div className="item">
                                <a target="_blank">
                                    <div className="row">
                                        <div className="col-12 d-sm-none d-md-none">
                                            <div className="banner">
                                                <div className="img" style={{backgroundSize: '100%'}}></div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="content">
                                                <h1 className="heading">Title</h1>
                                                <p className="desc">Description will be here!</p>
                                            </div>
                                        </div>
                                        <div className="col-md-5 d-none d-sm-block">
                                            <div className="banner">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                                
                        </Swiper>
                        <div className="swiper-pagination custom-pagination" slot="pagination"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Slider;