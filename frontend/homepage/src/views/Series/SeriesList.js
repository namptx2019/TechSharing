import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';
import moment from 'moment';
import Select from 'react-select';
import SeriesService, {SeriesServiceError} from "../../services/series.service";
import CategoryService, {CategoryServiceError} from "../../services/category.service";

const SeriesList = () => {

    const [SeriesList, setSeriesList] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const [filters, setFilters] = useState({
        category: 0,
        search: '',
        name: '',
    });
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;
    const pagesCount = Math.ceil(SeriesList.length / pageSize);

    const fetchSeries = async (searchInputs = null) => {
        try {
            const response = await SeriesService.popular(searchInputs);
            setSeriesList(response.data);
            return response;
        } catch(e) {
            if(e instanceof SeriesServiceError){

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

    const searchSeries = (event) => {
        if(event){
            const { name, value } = event.target;
            filters[name] = value;
        }
        if(filters.category != 0){
            filters.search = "name:"+filters.name+";category_id:"+filters.category;
        } else {
            filters.search = "name:"+filters.name;
        }
        fetchSeries(filters.search);
    }

    const handleSelect = (selection, action) => {
        filters.category = selection.id;
        searchSeries();
    }

    const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
    }

    const fromNow = (input) => {
        return moment(input).fromNow();
    }

    useEffect(() => {
        fetchSeries();
        fetchCategories();
    },[]);

    return(
        <section className="section-block page-series" id="LatestSeries">
            <div className="container">
                <div className="latest-post">
                    <div className="row align-items-start">
                        <div className="post-filter col-12 col-md-6 order-md-last">
                            <div className="filter-group">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-1 d-inline search-icon"><span className="icon-enter-search"></span></div>
                                    <div className="d-inline col-5 input-search">
                                        <input type="text" className="inp-search" name="name" onChange={(e) =>searchSeries(e)}/>
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
                        <div className="Series-page-title col-12 col-md-6 order-md-first">
                            <h2 className="title">All Series</h2>
                            <div className="primary left"><hr/></div>
                        </div>
                    </div>
                </div>
                    {SeriesList && SeriesList.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map(seriesItem =>
                        <div className="list-post">
                            <div className="row align-items-stretch" >
                            <div className="col-12 col-xl-8">
                                <Link to={'/series/'+seriesItem.slug} className="post latest-post">
                                    <div className="img" style={{backgroundImage: `url(${seriesItem.full_path})`}}></div>
                                    <div className="content">
                                        <h1 className="title">{limitStr(seriesItem.name,125)}</h1>
                                        <div className="author">
                                            <span className="author-name">{seriesItem.author.username}</span>
                                        </div>
                                        <p className="desc">{limitStr(seriesItem.desc,150)}</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-xl-4 d-none d-xl-flex flex-column align-items-start">
                                {seriesItem.getAllPosts && seriesItem?.getAllPosts?.map(item =>
                                    <Link tag="a" to={'/posts/' + item.slug} className="apost d-flex align-items-center justify-content-start">
                                        <div className="apost-thumbnail">
                                            <img src={item.full_path} alt=""/>
                                        </div>
                                        <div className="apost-information flex-fill">
                                            <div className="apost-information-author">
                                                <span className="author">{limitStr(item.author.username,12)}</span>
                                                <span> - </span>
                                                <span className="post-time">{fromNow(item.created_at.date) }</span>
                                            </div>
                                            <div className="apost-information-title">
                                                {limitStr(item.name,17)}
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                        </div>
                    )}
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

export default SeriesList;
