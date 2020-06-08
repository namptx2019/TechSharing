import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from "react-router-dom";
import CategoryService, {CategoryServiceError} from "../../services/category.service";
import PostService, {PostServiceError} from "../../services/post.service";
import swal from "sweetalert2";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import RadientBackground from '../RadientBackground/RadientBackground';

const AddPost = () => {
    const history = useHistory();
    const [Post, setPost] = useState({
        name: '',
        description: '',
        category_id: 0,
        thumbnail: '',
        content: ''
    });
    const [imgPreview, setimgPreview] = useState([]);
    const [error, setError] = useState({});
    const [CategoryList, setCategoryList] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.get();
            setCategoryList(response.data);
            return response;
        } catch(e) {
            if(e instanceof CategoryServiceError){
              setError(e)
            }
        }
    }

    const editorSetting = {
        modules:{
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image']
            ],
        },

        formats: [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ]
    }

    const previewFile = (file) => {
        if (file && file.item(0)) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setimgPreview(e.target['result']);
            };
            reader.readAsDataURL(file.item(0));
        }
        setPost((prevState) =>
          ({
              ...prevState,
              thumbnail: file.item(0)
          }));

    }

    const handleSubmitAdd = async () => {
        setError([]);
        let formData = new FormData();
        if (Post.thumbnail.name) {
            formData.append('thumbnail', Post.thumbnail);
        }
        formData.append('desc', Post.description);
        formData.append('category_id', Post.category_id);
        formData.append('content', Post.content);
        formData.append('name', Post.name);
        formData.append('status', 1);
        try {
            const response = await PostService.create(formData);
            if(response.error){
                swal.fire({
                    title: 'Error',
                    icon: 'warning',
                })
            }
            else{
                swal.fire({
                    title: 'Post created',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        history.push('/posts/');
                    }
                })
            }
            return response;
        } catch(e) {
            if(e instanceof PostServiceError){

            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        Post[name] = value;
    }

    const handleChangeEditor = (event) => {
        setPost((prevState) =>
          ({
              ...prevState,
              content: event
          }));
    }

    useEffect(() => {
        fetchCategories();
    },[]);

    return(
        <section className="section-block" id="AddPost">
          <RadientBackground/>
          <div className="container">
            <div className="all-contest">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <div className="title">
                    Add new post
                  </div>
                  <Col xs>
                    <div className="post-add-form">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Title <span class="required">*</span></Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="name-input" name="name" onChange={(e) => handleChange(e)}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Description <span className="required">*</span></Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="description-input" name="description" onChange={(e) => handleChange(e)} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="select">Select <span className="required">*</span></Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="select" name="category_id" id="select" onChange={(e) => handleChange(e)}>
                            <option value="0">Please select category</option>
                            {CategoryList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-input">Thumbnail <span className="required">*</span></Label>
                        </Col>
                        <Col xs="12" md="9">
                          <div className="input-user-ava">
                            <Col xs="12" md="12">
                              { Post.thumbnail !== '' && <img className="preview-ava" src={imgPreview}/>}
                            </Col>
                            <Input type="file" className="d-none" id="add-ava" name="file-input" onChange={(e) => previewFile(e.target.files)}/>
                            <label htmlFor="add-ava" className="btn btn-outline-success m-btn m-btn--icon mb-0 mr-2">
                            <span>
                                <i className="fa fa-upload"></i> Upload
                            </span>
                            </label>
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="textarea-input">Content <span className="required">*</span></Label>
                        </Col>
                        <Col xs="12" md="9">
                          <ReactQuill theme="snow" value={Post.content} modules={editorSetting.modules} name="content" onChange={(e) => handleChangeEditor(e)}/>
                        </Col>
                      </FormGroup>
                      <div className="btn-group-form mb-5">
                        <button type="button" className="btn mr-2 btn-primary" onClick={() => handleSubmitAdd()}>Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={() => history.push('/posts/')}>Cancel</button>
                      </div>

                    </div>
                  </Col>

                </div>
              </div>
            </div>

          </div>
        </section>
    );
}

export default AddPost;
