import React, { useState } from 'react';
import {
	Link
  } from "react-router-dom";

const SeriesItem = ({slug,img, title, username, description}) => {

    const limitStr = (input, limit) => {
        if(input.length > limit){
            return input = input.substr(0, limit)+" ...";
        }
        return input;
    }

    return(
        <Link className="item-seri mb-4 mt-4" to={/series/ + slug}>
            <div className="img" style={{backgroundImage: `url(${img})`}}></div>
            <div className="content">
                <h1 className="heading">{limitStr(title,50)}</h1>
                <h2 className="author">{limitStr(username,50)}</h2>
                <p className="desc">{limitStr(description,75)}</p>
            </div>
        </Link>
    );
}

export default SeriesItem;
