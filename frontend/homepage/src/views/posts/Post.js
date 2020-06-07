import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

const Post = () => {
   
    return(
        <div className="col-6 col-sm-4 col-lg-3">
            <Link tag="a" className="post" >
                <div className="img" style={{backgroundImage: '../static/images/useravatar.jpg'}}></div>
                <div className="content">
                    <div className="author">
                        <span className="author-name">Author Name</span> <span> - </span> <span className="time-post">Create at...//TODO: binding in</span>
                    </div>
                    <h1 className="title">Title</h1>
                    <div className="rating d-flex align-items-end">
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
                        <div className="rating-num">
                            <span id="numRating">(300)</span>
                        </div>
                    </div>
                    <p className="desc">Description</p>
                </div>
            </Link>
        </div>
    );
}

export default Post;
