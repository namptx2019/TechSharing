import React, { useState } from 'react';
import {
	Link
  } from "react-router-dom";

const Post = ({slug, thumbnail, author, diff_created, name, description }) => {
    const limitStr = (input, limit) => {
        if(input.length > limit){
            return input = input.substr(0, limit)+" ...";
        }
        return input;
    }
    return(
        <div className="col-6 col-sm-4 col-lg-3">
            <Link tag="a" to={/posts/ + slug} className="post">
                <div className="img" style={{backgroundImage: `url(${thumbnail})`}}></div>
                <div className="content">
                    <div className="author">
                        <span className="author-name">{author}</span> <span> - </span> <span className="time-post">{diff_created}</span>
                    </div>
                    <h1 className="title">{limitStr(name,50)}</h1>
                    <p className="desc">{limitStr(description,75)}</p>
                </div>
            </Link>
        </div>
    );
}

export default Post;
