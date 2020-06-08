import React, {useEffect, useState} from 'react';
import {
  Link,
  useParams
} from "react-router-dom";
import CategoryService, {CategoryServiceError} from "../../services/category.service";

const CategoryDetails = () => {
  let params = useParams();
  const [Category, setCategory] = useState([]);

  const fetchCategory = async (slug) => {
    try {
      const response = await CategoryService.getSpecific(slug);
      setCategory(response);
      return response;
    } catch(e) {
      if(e instanceof CategoryServiceError){

      }
    }
  }
  useEffect(() => {
    fetchCategory(params.slug);
    console.log(Category);
  },[params.slug]);

  return(
    <section className="section-block">
      <div className="page-category-detail-content">
        <div className="container">
          {
            Category.has_series && Category.has_series.length !== 0 &&
              <div className="content-section series">
                <div className="content-section-title">
                  <h3>Series of {Category.name}</h3>
                </div>
                <div className="content-section-list">
                  <div className="row">
                    {
                      Category.has_series.map(item =>
                        <div className="col-12 col-sm-6">
                          <div className="content-section-list-item">
                            <Link to={/series/ +item.slug} tag="a">
                              <div className="content-section-list-item-thumbnail">
                                <img src={item.full_path} alt=""/>
                              </div>
                              <div className="content-section-list-item-info">
                                <h5 className="title">{item.name}</h5>
                                <h5 className="author">{item.author?.username}</h5>
                                <p className="desc">{item.desc}</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )
                    }
                </div>
              </div>
              </div>
          }

          {
            Category.has_posts && Category.has_posts.length !== 0 &&
            <div className="content-section posts">
              <div className="content-section-title">
                <h3>Posts of {Category.name}</h3>
              </div>
              <div className="content-section-list">
                <div className="row">
                  {
                    Category.has_posts && Category.has_posts.map(item =>
                      <div className="col-12 col-sm-6 col-md-4 col-xl-3">
                        <div className="content-section-list-item">
                          <Link tag="a" to={/posts/ + item.slug}>
                            <div className="content-section-list-item-thumbnail">
                              <img src={item.full_path} alt=""/>
                            </div>
                            <div className="content-section-list-item-info">
                              <h5 className="title">{item.name}</h5>
                              <h5 className="author">{item.author?.username}</h5>
                              <p className="desc">{item.desc}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          }

          {
            Category.has_posts && Category.has_series && Category.has_posts.length === 0 && Category.has_series.length === 0 &&
            <div className="content-section blank" v-else>
              <div className="content-section-title">
                <h3 className="mb-4">Opps! We can't find any contents matched with this category</h3>
              </div>
            </div>
          }

      </div>
      </div>
    </section>
  );
}

export default CategoryDetails;