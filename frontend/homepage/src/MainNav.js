import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import './index.css';
import Login from './Login/Login';

const MainNav = () => {
    return(
        <div className="header-section">
			<div className="container">
				<div className="header-section-wrapper d-flex align-items-stretch justify-content-between">

					<Link to ="/" className="logo">
						<img src = {require('./static/images/logo/black.png')}/>
					</Link>

					
						<div className="nav-items d-none d-xl-block">
							<div className="nav-items-wrapper">
								<ul className="d-flex justify-content-end align-items-center no-padding no-margin">
									<li>
										<div className="nav-item category-dropdown" style={{color:'black'}}>
											<div className="nav-item-wrapper">
												<span className="category-dropdown-text">Categories <i className="icon-enter-arrow-down"></i></span>
												<transition name="fade">
													<categories-header v-show="showCategory"/>
												</transition>
											</div>
										</div>
									</li>
									<li>
										<Link className="nav-item" style={{color:'black'}}>Series</Link>
									</li>
									<li>
										<Link className="nav-item" style={{color:'black'}}>Posts</Link>
									</li>
									<li>
										<Link className="nav-item" style={{color:'black'}}>Contests</Link>
									</li>
									<li>
										<Link className="nav-item" style={{color:'black'}}>Test and Get Hired</Link>
									</li>

									<li>
										<Link to ="/login">
											<button className="btn nav-button btn-danger">Login</button>
										</Link>
									</li>
									
								</ul>
							</div>
						</div>
				</div>
			</div>
		</div>
    );
}

export default MainNav;