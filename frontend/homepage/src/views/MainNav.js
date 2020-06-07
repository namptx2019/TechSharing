import React, {useEffect, useState} from 'react';
import {
	Link
  } from "react-router-dom";

import CategoryService, {CategoryServiceError} from "../services/category.service";

const MainNav = () => {
    const [CategoryList, setCategoryList] = useState([]);
    const [isHover, setisHover] = useState(false);
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
