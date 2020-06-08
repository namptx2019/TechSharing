import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';
import Select from 'react-select';
import PostService, {PostServiceError} from "../../services/post.service";
import CategoryService, {CategoryServiceError} from "../../services/category.service";
const PostList = () => {

    const [PostList, setPostList] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const [filters, setFilters] = useState({
        category: 0,
        search: '',
        name: '',
    });
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 20;
    const pagesCount = Math.ceil(PostList.length / pageSize);

    const fetchPosts = async (searchInputs = null) => {
        try {
            const response = await PostService.paginate(searchInputs);
            setPostList(response.data);
            return response;
        } catch(e) {
            if(e instanceof PostServiceError){

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

    const limitStr = (input, limit) => {
        if(input.length > limit){
        return input = input.substr(0, limit)+" ...";
        }
        return input;
    }

    const searchPost = (event) => {
        if(event){
            const { name, value } = event.target;
            filters[name] = value;
        }
        if(filters.category != 0){
            filters.search = "name:"+filters.name+";category_id:"+filters.category;
        } else {
            filters.search = "name:"+filters.name;
        }
        fetchPosts(filters.search);
    }

    const handleSelect = (selection, action) => {
        filters.category = selection.id;
        searchPost();
    }

    const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
    }

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    },[]);

    return(
        <section className="section-block page-posts" id="LatestPosts">
           <div className="container">
                <div className="latest-post">
                    <div className="row align-items-start">
                        <div className="post-filter col-12 col-md-6 order-md-last">
                            <div className="filter-group">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-1 d-inline search-icon"><span className="icon-enter-search"></span></div>
                                    <div className="d-inline col-5 input-search">
                                        <input type="text" className="inp-search" name="name" onChange={(e) =>searchPost(e)}/>
                                    </div>
                                    <div className="d-inline col-5">
                                        <Select
                                            name="text"
                                            onChange={(selection, action) => handleSelect(selection, action)}
                                            options={CategoryList}
                                            value={CategoryList.id}
                                            getOptionLabel={(CategoryList)=>CategoryList.name}
                                            getOptionValue={(CategoryList)=>CategoryList.id}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="post-page-title col-12 col-md-6 order-md-first">
                        <h2 className="title">All Posts</h2>
                        <div className="primary left"><hr/></div>
                    </div>
                </div>
            </div>
                <div className="list-post">
                    <div className="row" >
                        {PostList.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map(item =>
                            <div className="col-6 col-sm-4 col-lg-3">
                                <Link tag="a" to={/posts/ + item.slug} className="post">
                                    <div className="img" style={{backgroundImage: `url(${item.thumbnailFullpath})`}}></div>
                                    <div className="content">
                                        <div className="author">
                                        <span className="author-name">{item.author?.username}</span> <span> - </span> <span className="time-post">{item.diff_created}</span>
                                        </div>
                                        <h1 className="title">{limitStr(item.name,50)}</h1>
                                        <p className="desc">{limitStr(item.description,75)}</p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Pagination size="sm">
                <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                        onClick={e => handlePageClick(e, currentPage - 1)}
                        previous
                        href="#"
                    />
                </PaginationItem>
                {[...Array(pagesCount)].map((page, i) =>
                    <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    <PaginationLink
                        onClick={e => handlePageClick(e, currentPage + 1)}
                        next
                        href="#"
                    />
                </PaginationItem>
            </Pagination>
        </section>
    );
}

export default PostList;
