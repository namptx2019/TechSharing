import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

const SeriesItem = ({img, title, username, description}) => {

    return(
        <Link className="item-seri mb-4 mt-4">
            <div className="img"></div>
            <div className="content">
                <h1 className="heading">Title</h1>
                <h2 className="author">UserName</h2>
                <p className="desc">Description</p>
                <div className="rating d-flex align-items-center">
                    <div className="rating-star">
                        <i className="icon-enter-star"></i>
                        <i className="icon-enter-star"></i>
                        <i className="icon-enter-star"></i>
                        <i className="icon-enter-star"></i>
                        <i className="icon-enter-star"></i>
                        <span className="star star-4">
                            <i className="icon-enter-star"></i>
                            <i className="icon-enter-star"></i>
                            <i className="icon-enter-star"></i>
                            <i className="icon-enter-star"></i>
                            <i className="icon-enter-star"></i>
                        </span>
                    </div>
                    <div className="rating-num"><span id="numRating">(3.456</span> ratings)</div>
                </div>
            </div>
        </Link>
    );
}

export default SeriesItem;
