import React, {useEffect, useState} from 'react';
import {
	Link
  } from "react-router-dom";

import CategoryService, {CategoryServiceError} from "../services/category.service";
import {TokenService} from "../services/token.service";
import UserService, { UserServiceError } from "../services/user.service";
import DEFAULT_AVATAR from "../static/images/default-avatar.png"

const MainNav = () => {
    const [CategoryList, setCategoryList] = useState([]);
    const [Current, setCurrent] = useState([]);
    const [isHover, setisHover] = useState(false);
    const [isDropdown, setDropdown] = useState(false);
    let isLoggedin = !!TokenService.getToken();
    const fetchCurrentUser = async () => {
        try {
            const response = await UserService.getUserInfo();
            setCurrent(response.data);
            return response;
        } catch(e) {
            if(e instanceof UserServiceError){

            }
        }
    }
    const logout = () => {
        try {
            const response = UserService.logout();
            return response;
        } catch(e) {
            if(e instanceof CategoryServiceError){

            }
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.get();
            setCategoryList(response.data);
            return response;
        } catch(e) {
            if(e instanceof CategoryServiceError){

            }
        }
    }

    useEffect(() => {
        fetchCategories();
        if(isLoggedin){
            fetchCurrentUser();
        }
    },[]);
    return(
        <div className="header-section">
			<div className="container">
				<div className="header-section-wrapper d-flex align-items-stretch justify-content-between">
					<Link to ="/" className="logo">
						<img src = {require('../static/images/logo/black.png')}/>
					</Link>
                    <div className="nav-items d-none d-xl-block">
							<div className="nav-items-wrapper">
								<ul className="d-flex justify-content-end align-items-center no-padding no-margin">
									<li>
										<div className="nav-item category-dropdown" style={{color:'black'}}>
											<div className="nav-item-wrapper">
												<span className="category-dropdown-text" onMouseOver={() => setisHover(true)}>Categories <i className="icon-enter-arrow-down"></i></span>
                                                {isHover &&
                                                    <div className="category-dropdown-wrapper box-shadow card" onMouseLeave={() => setisHover(false)}>
                                                        <div
                                                            className="card-body justify-content-center d-flex flex-row pt-5">
                                                            {CategoryList && CategoryList.map(item =>
                                                                <div className="category-dropdown-col">
                                                                    <Link to={/category/ + item.slug} tag="a"
                                                                          class="category-dropdown-col-title">{item.name}</Link>
                                                                    <hr/>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                }
											</div>
										</div>
									</li>
									<li>
										<Link className="nav-item" to ="/series" style={{color:'black'}}>Series</Link>
									</li>
									<li>
										<Link className="nav-item" to ="/posts" style={{color:'black'}}>Posts</Link>
									</li>
                                    {
                                        !isLoggedin &&
                                        <li>
                                            <Link to ="/login">
                                                <button className="btn nav-button btn-danger">Login</button>
                                            </Link>
                                        </li>
                                    }
                                    {
                                        !isLoggedin &&
                                        <li>
                                            <Link to ="/register">
                                                <button className="btn nav-button btn-secondary">Register</button>
                                            </Link>
                                        </li>
                                    }

                                    {
                                        isLoggedin &&
                                        <li>
                                            <div className="user-avatar profile-avatar" onMouseOver={() => setDropdown(true)}>
                                                {
                                                    Current && Current.avatars &&
                                                    <img src={Current.avatars.length !== 0 ? Current.avatars[0].full_path : DEFAULT_AVATAR} />
                                                }
                                                {
                                                    isDropdown && <div className="dropdown-profile card mt-2 box-shadow" onMouseLeave={() => setDropdown(false)}>
                                                        <ul className="dropdown-profile-wrapper">
                                                            <li>
                                                                <Link tag="a" to="/profile/me">
                                                                    <i className="icon-enter-user mr-2"></i>Profile
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link tag="a" to="/profile/activities">
                                                                    <i className="icon-enter-award mr-2"></i>Your activities
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to={'/profile/me'} tag="a">
                                                                    <i className="icon-enter-edit mr-2"></i>Edit profile
                                                                </Link>
                                                            </li>
                                                            <li className="divide"></li>
                                                            <li onClick={logout}><a href="javascript:void(0)">Logout</a></li>
                                                        </ul>
                                                    </div>
                                                }
                                            </div>


                                        </li>
                                    }

								</ul>
							</div>
						</div>
				</div>
			</div>
		</div>
    );
}

export default MainNav;
