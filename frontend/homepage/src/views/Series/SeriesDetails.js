import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import swal from 'sweetalert2'

import SeriesService, {SeriesServiceError} from "../../services/series.service";

import DEFAULT_AVATAR from "../../static/images/default-avatar.png"


const SeriesDetails = () => {
    let params = useParams();

    const [Series, setSeries] = useState({});

    const fetchSeries = async (slug) => {
        try {
            const response = await SeriesService.get(slug);
            setSeries(response.data[0]);
            return response;
        } catch(e) {
            if(e instanceof SeriesServiceError){

            }
        }
    }

    const limitStr = (input, limit) => {
        if(input.length > limit){
            return input = input.substr(0, limit)+" ...";
        }
        return input;
    }

    const fromNow = (input) => {
        return moment(input).fromNow();
    }


    useEffect(() => {
        fetchSeries(params.slug);
    },[params.slug]);

    return(
        <section className="section-block page-series-detail" id="seriesDetail">
            <div class="page-series-detail-top">
                <div class="page-series-detail-top-thumbnail">
                    <img src={Series.poster} alt=""/>
                </div>
                <div class="page-series-detail-top-intro mb-3">
                    <div class="container">
                        <div class="page-series-detail-top-intro-wrapper">
                            <ul class="category">
                                <li class="d-inline"><a href="#">{Series.category?.name}</a></li>
                            </ul>
                            <h3>{Series.name}</h3>
                            <div class="author d-flex justify-content-start align-items-center">
                                <div class="author-ava">
                                    <Link to={'/profile/show/'+Series.author?.uuid} tag="a">
                                        <img src={Series.author?.avatars[0] ? Series.author?.avatars[0].full_path : DEFAULT_AVATAR} alt="avatar"/>
                                    </Link>
                                </div>
                                <div class="author-info">
                                    <Link to={'/profile/show/'+Series.author?.uuid} tag="a" class="author-name">
                                        {Series.author?.username}
                                    </Link>
                                    <span class="time-post">{fromNow(Series.created_at?.date) }</span>
                                </div>
                            </div>
                            <div class="desc" dangerouslySetInnerHTML={{ __html: Series.description }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-series-detail-posts">
                <div class="container">
                    <div class="list-post">
                        <div class="row">
                            { Series.posts && Series?.posts?.map(item =>
                                <div className="col-6 col-md-4 col-lg-3">
                                    <Link to={'/posts/' + item.slug} tag="a" class="post">
                                        <div className="img" style={{backgroundImage: `url(${item.thumbnail})`}}>
                                        </div>
                                        <div className="content">
                                            <div className="author">
                                                <span className="author-name">{limitStr(item.author?.username, 10)}</span>
                                                <span> - </span>
                                                <span className="time-post">{fromNow(item.created_at?.date)}</span>
                                            </div>
                                            <h1 className="title">{limitStr(item.name, 50)}</h1>
                                            <p className="desc">{limitStr(item.desc, 75)}</p>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SeriesDetails;
