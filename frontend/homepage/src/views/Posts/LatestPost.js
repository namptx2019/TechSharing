import React, {useEffect, useState} from 'react';
import Post from './Post';
import PostService, {PostServiceError} from "../../services/post.service";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const LatestPost = () => {
    const [PostList, setPostList] = useState([]);
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

    const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
    }

    useEffect(() => {
        fetchPosts();
    },[]);
    return(
        <section className="section-block" id="LatestPosts">
            <div className="container">
                <div className="latest-post" >
                    <h2 className="title">Latest Post</h2>
                    <div className="primary left"><hr/></div>
                    <div className="list-post">
                        <div className="row">
                            {PostList.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map(item =>
                                <Post author={item.author.username} slug={item.slug} description={item.description} diff_created={item.diff_created} name={item.name} thumbnail={item.thumbnailFullpath} />
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
            </div>
        </section>
    );
}

export default LatestPost;
