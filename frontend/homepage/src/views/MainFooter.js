import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

const MainFooter = () => {
    return(
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-3">
                        <div className="d-block d-sm-none">
                            <div className="d-flex align-items-center justify-content-between">
                                <img className="logo" src="./images/logo_full.png" alt=""/>
                                <div className="contract">
                                    <div className="d-flex justify-content-end">
                                        <img src={require('../static/images/facebook.png')} alt=""/>
                                        <img src={require('../static/images/twitter.png')} alt=""/>
                                        <img src={require('../static/images/linkedin.png')} alt=""/>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        <div className="d-none d-sm-block">
                            <div className="d-flex align-items-center justify-content-center">
                                <img className="logo" src={require('../static/images/logo/black.png')}  alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="mobile-footer d-block d-sm-none">
                            <table>
                                <tbody><tr>
                                    <td>
                                        <Link  tag="a" to="/series">
                                            Series
                                        </Link>
                                    </td>

                                    <td>
                                        <Link  tag="a" to="/category">
                                            Categories
                                        </Link>
                                    </td>

                                    <td>
                                        <Link  tag="a" to="/pages/faq">
                                            Faq
                                        </Link>
                                    </td>
                                    <td>
                                        <Link tag="a" to="/pages/contacts">
                                            Contacts
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link  tag="a" to="/posts">
                                            Posts
                                        </Link>
                                    </td>
                                    
                                    <td>
                                        <Link  tag="a" to="/pages/privacy-policy">
                                            Privacy Policy
                                        </Link>
                                    </td>

                                    <td>
                                        <Link  tag="a" to="/pages/terms-of-use">
                                            Term of use
                                        </Link>
                                    </td>
                                    
                                </tr>
                            </tbody></table>
                        </div>
                        <div className="tablet-footer d-none d-sm-block">
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <Link  tag="a" to="/series">
                                            Series
                                        </Link>
                                    </td>
                                    <td>
                                        <Link  tag="a" to="/category">
                                            Categories
                                        </Link>
                                    </td>
                                    <td>
                                        <Link  tag="a" to="/posts">
                                            Posts
                                        </Link>
                                    </td>
                                </tr>
                            </tbody></table>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3 d-none d-sm-block">
                        <div className="d-flex height-100 align-items-end flex-column bd-highlight">
                            <div className="p-2 d-sm-none d-md-none d-lg-block language">
                                <select name="locale" v-model="sysLocale">
                                    <option value="en">English</option>
                                    <option value="vi">Tiếng Việt</option>
                                    <option value="ba">Bahasa Indonesia</option>
                                </select>
                            </div>
                            <div className="mt-auto p-2 contract">
                                <div className="d-flex justify-content-end align-items-end">
                                    <a href="#"><img className="align-self-end" src={require('../static/images/facebook.png')} alt=""/></a>
                                    <a href="#"><img src={require('../static/images/twitter.png')} alt=""/></a>
                                    <a href="#"><img src={require('../static/images/linkedin.png')}  alt=""/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            

                <div className="copy-right d-flex align-items-center justify-content-center">
                    Copyright
                </div>

                <div id="backToTop" style={{display: 'block'}}>
                    <div className="backtotop box-shadow">
                        <img src={require('../static/images/up-arrow.svg')}/>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default MainFooter;
