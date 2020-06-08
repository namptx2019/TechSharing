import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useParams } from "react-router-dom";
import '../../index.css';
import UserService, { UserServiceError } from "../../services/user.service";


const OtherUser = () => {
    let params = useParams();

    const [User, setUser] = useState({});

    const fetchUser = async (slug) => {
        try{
            const response = await UserService.getUserByUuid(slug);
            setUser(response.data);
        }
        catch(e){
            alert('Exception detail:' + e);
        }
    }

    useEffect(() => {
        fetchUser(params.slug);
      },[params.slug]);

    return(
        <div className="profile-info page-padding" v-if="user !== null">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-5 mb-4">
                        <div className="general-info box-shadow">
                            <div className="general-info-resume d-flex flex-xl-column justify-content-start align-items-start">
                                <div className="general-info-resume-ava">
                                    <div className="thumb">
                                        { User.avatars.length != 0  && <img src={User.avatars} DEFAULT_AVATAR  alt='avatar'/>}
                                        { User.avatars.length == 0 && <img src={require('../../static/images/default-avatar.png')} DEFAULT_AVATAR  alt='avatar'/>}
                                    </div>
                                </div>
                                <div className="general-info-resume-intro">
                                    <h1 className="username">{User.username}</h1>
                                    <p className="status" title="entry" v-if="user.entry">User Entry</p>

                                </div>
                            </div>
                            <div className="general-info-reaction text-center">
                                <div className="general-info-reaction-item">
                                    <div className="general-info-reaction-item-title">
                                        Score
                                    </div>
                                    <div className="general-info-reaction-item-content">
                                        User score
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-7 mb-4">
                        <div className="detail-info box-shadow">
                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">User name</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value">{User.username}</span>
                                </div>
                            </div>
                            <hr/>

                            <div className="row" v-if="user.display_settings.email">
                                <div className="col-4">
                                    <span className="text-field">Email</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value">{User.email}</span>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Gender</span>
                                </div>
                                <div className="col-8">
                                    {User.gender === 0 && <span className="field-value">Male</span>}
                                    {User.gender === 1 && <span className="field-value">Female</span>}
                                    {User.gender === 2 && <span className="field-value">Other</span>}
                                </div>
                            </div>
                            <hr/>

                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Phone number</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value">{User.phone}</span>
                                </div>
                            </div>
                            <hr/>

                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Day of birth</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value">{User.date_of_birth}</span>
                                </div>
                            </div>
                            <hr/>


                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Working place</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value text">{User.working_place}</span>
                                </div>
                            </div>
                            <hr/>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OtherUser;
