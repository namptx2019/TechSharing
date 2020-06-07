import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';

const LatestPost = () => {
   
    return(
        <section className="section-block" id="LatestPosts">
            <div className="container">
                <div className="latest-post" >
                    <h2 className="title">Latest Post</h2>
                    <div className="primary left"><hr/></div>
                    <div className="list-post">
                        <div className="row">
                            <Post/>
                            <Post/>
                            <Post/>
                        </div>
                    </div>
                </div>
                <div className="view-more">
                    <button className="btn btn-info" >
                        View more
                    </button>
                </div>
            </div>
        </section>
    );
}

export default LatestPost;
