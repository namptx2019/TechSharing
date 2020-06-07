import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import swal from 'sweetalert2'
import SimpleMDE from "react-simplemde-editor";
import ReactMarkdown from 'react-markdown/with-html';
import "easymde/dist/easymde.min.css";

import PostService, {PostServiceError} from "../../services/post.service";
import CommentService, {CommentServiceError} from "../../services/comment.service";
import DEFAULT_AVATAR from "../../static/images/default-avatar.png"


const PostDetails = () => {
    let params = useParams();

    const [Post, setPost] = useState({});
    const [Comment, setComment] = useState('');
    const [CommentList, setCommentList] = useState([]);
    const fetchPost = async (slug) => {
        try {
            const response = await PostService.get(slug);
            setPost(response.data[0]);
            return response;
        } catch(e) {
            if(e instanceof PostServiceError){

            }
        }
    }

    const fetchComment = async (slug) => {
        try {
            const response = await CommentService.getComment(slug);
            setCommentList(response);
            return response;
        } catch(e) {
            if(e instanceof CommentServiceError){

            }
        }
    }

    const handleChange = (event) => {
        setComment(event);
    }
    
    const submitComment = async () => {
        if(Comment === ''){
            swal.fire({
                toast: true,
                position: 'center-end',
                icon: 'warning',
                title: 'Please type something',
                showConfirmButton: false,
                timer: 1500
            });
        }
        else{
            try {
                let data = {
                    'content': Comment
                }
                const response = await CommentService.postComment(params.slug,data);
                if(response){
                    setComment('');
                    swal.fire({
                        toast: true,
                        position: 'center-end',
                        icon: 'success',
                        title: 'Your comment has been posted',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    fetchComment(params.slug);
                }
            } catch(error) {
                if(error instanceof CommentServiceError){

                }
            }
        }
    }

    const limitStr = (input, limit) => {
        if(input.length > limit){
            return input = input.substr(0, limit)+" ...";
        }
        return input;
    }

    const fromNow = (input) => {
        return moment(input).fromNow();
    }


    useEffect(() => {
        fetchPost(params.slug);
        fetchComment(params.slug);
    },[params.slug]);

    return(
        <section className="section-block page-post-detail" id="postDetail">
            <div className="post-detail">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="post-detail-general-info">
                                <div className="row align-items-start align-items-lg-center">
                                    <div className="col-12 col-md-6 order-md-last post-thumb">
                                        <img src={Post.thumbnailFullpath} alt=""/>
                                    </div>
                                    <div className="col-12 col-md-6 order-md-first general-info">
                                        <div className="general-info-category" v-if="!loading">
                                            <ul>
                                                <li className="d-inline"><a href="#">{Post.category?.name}</a></li>
                                            </ul>
                                            <h3>{Post.name}</h3>
                                            <div
                                                className="general-info-author d-flex justify-content-start align-items-center">
                                                <div className="general-info-author-avatar">
                                                    <Link to={'/profile/show/'+Post.author?.uuid} tag="a">
                                                        <img
                                                            src={Post.author?.avatars[0] ? Post.author.avatars[0].full_path : DEFAULT_AVATAR}
                                                            alt="avatar"/>
                                                    </Link>
                                                </div>
                                                <div className="general-info-author-name">
                                                    <Link to={'/profile/show/'+Post.author?.uuid} tag="a"
                                                                 className="author-name">
                                                        {Post.author?.username}
                                                    </Link>
                                                    <span className="time-post">{Post.diff_created}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container post-main-content">
                    <div className="row">
                        <div className="col-12">
                            <div className="post-detail-content" dangerouslySetInnerHTML={{ __html: Post.content }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="latest-post">
                            <h2 className="title">Related Post</h2>
                            <div className="list-post">
                                <div className="row">
                                    {Post.relate && Post?.relate?.map(item =>
                                        <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                            <Link tag="a" to={'/posts/' + item.slug} className="post">
                                                <div className="img"
                                                     style={{backgroundImage: `url(${item.full_path})`}}></div>
                                                <div className="content">
                                                    <div className="author">
                                                        <span className="author-name">{item.author.username}</span>
                                                        <span> - </span>
                                                        <span className="time-post">{fromNow(item.created_at)}</span>
                                                    </div>
                                                    <h1 className="title">{item.name}</h1>
                                                    <p className="desc">{limitStr(item.desc,125)}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="comment">
                            <h3>Comments</h3>
                            <div className="comment-editor align-items-center">
                                <div className="text-box">
                                    <SimpleMDE onChange={(e) => handleChange(e)} options={{
                                        toolbar: ["bold", "italic", "heading", "|", "quote", "code"],
                                        spellChecker: false,
                                        placeholder: 'Write your comment here',
                                    }}/>
                                    <div className="action text-align-right">
                                        <button onClick={submitComment} className="btn btn-info">Submit</button>
                                    </div>
                                </div>
                            </div>
                            {CommentList && CommentList.map(item =>
                                <div className="comment-box">
                                    <div className="comment-box-info d-flex align-items-center">
                                        <div className="ava">
                                            <Link to={'/profile/show/'+item.author.uuid} tag="a">
                                                <img
                                                    src={item.author.avatars[0] ? item.author.avatars[0].full_path : DEFAULT_AVATAR }
                                                    alt="avatar"/>
                                            </Link>
                                        </div>
                                        <div className="comment-box-info-user">
                                            <Link to={'/profile/show/'+item.author.uuid} tag="a"
                                                         className="username">
                                                {item.author.username}
                                            </Link>
                                            <span className="post-time">{fromNow(item.created_at)}</span>
                                        </div>
                                    </div>
                                    <div className="comment-box-comment">
                                        <ReactMarkdown source={item.content}></ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostDetails;
