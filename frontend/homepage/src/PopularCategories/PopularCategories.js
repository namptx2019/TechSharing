import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import '../index.css';

const PopularCategories = () => {
    return(
        <section className="section-block">
            <div className="container">
                <div className="popular-category">
                    <h2 className="title text-center">Popular Categories</h2>
                    <div className="primary center"></div>
                    <div className="list-category">
                        <div className="row">
                            <div className="col-6 col-md-4">
                                <div className="item-category d-flex justify-content-center align-items-center">
                                    <div className="category-info">
                                        <div className="info d-flex align-items-center justify-content-center">
                                            <span>x Contests, y Series, z Posts</span>
                                        </div>
                                        <Link  className="btn btn-info show-more" tag="button">Show more</Link>
                                    </div>
                                    <div className="category-name d-flex flex-column justify-content-center align-items-center">
                                        <div className="name" style={{height: 'auto'}}>Category Name</div>
                                        <div className="border"></div>
                                    </div>
                                    <div className="category-bg">
                                        <div v-if="key == 0" className="fill fill-pink"></div>
                                        <div v-if="key == 1" className="fill fill-gray"></div>
                                        <div v-if="key == 2" className="fill fill-blue"></div>
                                        <div v-if="key == 3" className="fill fill-green"></div>
                                        <div v-if="key == 4" className="fill fill-yellow"></div>
                                        <div v-if="key == 5" className="fill fill-red"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-more">
                        <Link tag="a" to="/category"><button className="btn btn-info">View more</button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PopularCategories;