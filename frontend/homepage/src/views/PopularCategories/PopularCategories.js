import React, {useEffect, useState} from 'react';
import {
	Link
  } from "react-router-dom";
import CategoryService, {CategoryServiceError} from "../../services/category.service";

const PopularCategories = () => {
    const [CategoryList, setCategoryList] = useState([]);
    const [HoverCate, setHoverCate] = useState(null);
    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getPopular();
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
        <section className="section-block">
            <div className="container">
                <div className="popular-category">
                    <h2 className="title text-center">Popular Categories</h2>
                    <div className="primary center"></div>
                    <div className="list-category">
                        <div className="row">
                            {CategoryList && CategoryList.map((item,index) =>
                                <div className="col-6 col-md-4" onMouseOver={() => setHoverCate(index)} onMouseLeave={() => setHoverCate(null)}>
                                    <div className="item-category d-flex justify-content-center align-items-center">
                                        {
                                            HoverCate === index &&
                                            <div className="category-info">
                                                <div className="info d-flex align-items-center justify-content-center">
                                                    <span>{item.has_series_count} Series, {item.has_posts_count} Posts</span>
                                                </div>
                                                <Link to={/category/ + item.slug}  className="btn btn-info show-more" tag="button">Show more</Link>
                                            </div>
                                        }

                                        <div className="category-name d-flex flex-column justify-content-center align-items-center">
                                            <div className="name" style={{height: 'auto'}}>{item.name}</div>
                                            <div className="border"></div>
                                        </div>
                                        <div className="category-bg">
                                            {index === 0 && <div className="fill fill-pink"></div>}
                                            {index === 1 && <div v-if="key == 1" className="fill fill-gray"></div>}
                                            {index === 2 && <div v-if="key == 2" className="fill fill-blue"></div>}
                                            {index === 3 && <div v-if="key == 3" className="fill fill-green"></div>}
                                            {index === 4 && <div v-if="key == 4" className="fill fill-yellow"></div>}
                                            {index === 5 && <div v-if="key == 5" className="fill fill-red"></div>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="view-more">
                        <Link tag="a" to="/category"><button className="btn btn-info">View more</button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PopularCategories;
