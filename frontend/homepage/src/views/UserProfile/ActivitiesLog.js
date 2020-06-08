import React, {useEffect, useState} from 'react';
import {
    Link
} from "react-router-dom";
import moment from 'moment';
import UserService, {UserServiceError} from "../../services/user.service";


const ActivitiesLog = () => {
    const [User, setUser] = useState([]);
    const fetchCurrentUser = async () => {
        try {
            const response = await UserService.getUserInfo();
            setUser(response.data);
            return response;
        } catch(e) {
            if(e instanceof UserServiceError){

            }
        }
    }


    useEffect(() => {
        fetchCurrentUser();
    },[]);

    return(
        <section className="section-block profile-info profile-activity page-padding">
            <div className="container">
                {
                    User && User.score_logs && User.score_logs.length !== 0 &&
                    <div className="activities-logs">
                        <h2 className="title center">Your activity log</h2>
                        <div className="primary center long"></div>
                        <div className="list-contest">
                            <h3 className="title-sub">Total Score: {User.score}</h3>
                            <div className="list-contest-item">
                                {
                                    User && User.score_logs && User.score_logs.length !== 0 && User.score_logs.map(item =>
                                        <div className="activity-container justify-content-between align-items-center">
                                            <div className="group-info">
                                                <div className="info">
                                                    {
                                                        (item.entity === 'Post' || item.entity === 'Series') &&
                                                        <p>You have received <b>{item.score}</b> score
                                                            by {item.action} a {item.entity}:
                                                            {
                                                                item.entity == 'Post' &&
                                                                <Link tag="a" to={'/posts/' + item.entity_instance.slug}>{item.entity_instance.name}</Link>
                                                            }
                                                            {
                                                                item.entity == 'Series' &&
                                                                <Link tag="a" to={'/series/' + item.entity_instance.slug}>{item.entity_instance.name}</Link>
                                                            }
                                                        </p>
                                                    }

                                                    {
                                                        item.entity === 'Comment' &&
                                                        <p>You have received <b>{item.score}</b> score
                                                            by {item.action} a comment in this post:
                                                            <Link tag="a"
                                                                  to={'/posts/' + item.entity_instance.post.slug}>{item.entity_instance.post.name}</Link>
                                                        </p>
                                                    }
                                                    <div className="des">At {moment(item.created_at).format('MMMM Do YYYY, h:mm')}</div>
                                                </div>
                                            </div>
                                            {
                                                (item.entity == 'Post' || item.entity == 'Series') &&
                                                <div className="thumbnail d-md-block">
                                                    {
                                                        item.entity == 'Post' &&
                                                        <Link tag="a" to={'/posts/' + item.entity_instance.slug}>
                                                            <div className="img"
                                                                 style={{backgroundImage: `url(${item.entity_instance.full_path})`}}></div>
                                                        </Link>
                                                    }

                                                    {
                                                        item.entity == 'Series' &&
                                                        <Link tag="a" to={'/series/' + item.entity_instance.slug}>
                                                            <div className="img"
                                                                 style={{backgroundImage: `url(${item.entity_instance.full_path})`}}></div>
                                                        </Link>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }

                {
                    User && User.score_logs && User.score_logs.length === 0 &&
                    <div>
                        <div className="card mb-5">
                            <div className="card-body">
                                <h2 className="card-title text-center">You don't have any activity yet</h2>
                                <p className="card-text text-center">You can comment or post something and then recheck this page.</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
}

export default ActivitiesLog;
