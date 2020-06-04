import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MainNav = () => {
    return(
        <div className="header-section">
			<div className="container">
				<div className="header-section-wrapper d-flex align-items-stretch justify-content-between">

					<div classNameName="logo">
						<img src = {require('./static/images/logo/black.svg')}/>
					</div>

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
									<div className="nav-item" style={{color:'black'}}>Series</div>
								</li>
								<li>
									<div className="nav-item" style={{color:'black'}}>Posts</div>
								</li>
								<li>
									<div className="nav-item" style={{color:'black'}}>Contests</div>
								</li>
								<li>
									<div className="nav-item" style={{color:'black'}}>Test and Get Hired</div>
								</li>

								<li>
									<button className="btn nav-button btn-danger">Login</button>
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