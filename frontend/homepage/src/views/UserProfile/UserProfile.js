import React from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

const UserProfile = () => {
    return(
        <div className="profile-info page-padding" v-if="user !== null">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-5 mb-4">
                        <div className="general-info box-shadow">
                            <div className="general-info-resume d-flex flex-xl-column justify-content-start align-items-start">
                                <div className="general-info-resume-ava">
                                    <div className="thumb">
                                        <img src={require('../../static/images/useravatar.jpg')} DEFAULT_AVATAR  alt='avatar'/>
                                    </div>
                                </div>
                                <div className="general-info-resume-intro">
                                    <h1 className="username">User Name</h1>
                                    <p className="status" title="entry" v-if="user.entry">User Entry</p>
                                    <Link tag="a" className="btn btn-sm btn-info" >
                                        Edit
                                    </Link>

                                </div>
                            </div>
                            <div className="general-info-reaction d-flex justify-content-between align-items-center">
                                <div className="general-info-reaction-item">
                                    <div className="general-info-reaction-item-title">
                                        Ranking
                                    </div>
                                    <div className="general-info-reaction-item-content">
                                        <img className="medal" src={require('../../static/images/medal.png')} alt="medal-platinum"/> Platinum
                                    </div>
                                </div>
                                <div className="general-info-reaction-item">
                                    <div className="general-info-reaction-item-title">
                                        Favorites
                                    </div>
                                    <div className="general-info-reaction-item-content">
                                        1100
                                    </div>
                                </div>
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
                                    <span className="field-value">Username</span>
                                </div>
                            </div>
                            <hr/>

                            <div className="row" v-if="user.display_settings.email">
                                <div className="col-4">
                                    <span className="text-field">Email</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value">email</span>
                                </div>
                            </div>
                            <hr v-if="user.display_settings.email"/>


                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">gender</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value" v-if="user.gender === 0">Male</span>
                                    <span className="field-value" v-if="user.gender === 1">Female</span>
                                    <span className="field-value" v-if="user.gender === 2">Other</span>
                                </div>
                            </div>
                            <hr/>

                            <div className="row" v-if="user.display_settings.phone">
                                <div className="col-4">
                                    <span className="text-field">Phone number</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value">Phone</span>
                                </div>
                            </div>
                            <hr v-if="user.display_settings.phone"/>

                            <div className="row" v-if="user.display_settings.date_of_birth">
                                <div className="col-4">
                                    <span className="text-field">Day of birth</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value">user_day_of_birth</span>
                                </div>
                            </div>
                            <hr v-if="user.display_settings.date_of_birth"/>


                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Working place</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value text">user.working_place</span>
                                </div>
                            </div>
                            <hr/>

                            <div className="row" v-if="user.display_settings.facebook">
                                <div className="col-4">
                                    <span className="text-field">Facebook</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value text">user.facebook</span>
                                </div>
                            </div>
                            <hr v-if="user.display_settings.facebook"/>



                            <div className="row" v-if="user.display_settings.skype">
                                <div className="col-4">
                                    <span className="text-field">Skype</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value text">user.skype</span>
                                </div>
                            </div>
                            <hr v-if="user.display_settings.skype"/>

                            <div className="row" v-if="user.display_settings.twitter">
                                <div className="col-4">
                                    <span className="text-field">Twitter</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value text">user.twitter</span>
                                </div>
                            </div>
                            <hr v-if="user.display_settings.twitter"/>

                            <div className="row" v-if="user.display_settings.linkedin">
                                <div className="col-4">
                                    <span className="text-field">Linkedin</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value text">user.linkedin</span>
                                </div>
                            </div>
                            <hr v-if="user.display_settings.linkedin"/>


                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Timezone</span>
                                </div>
                                <div className="col-8">
                                    <span className="field-value text">user.location</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserProfile;
