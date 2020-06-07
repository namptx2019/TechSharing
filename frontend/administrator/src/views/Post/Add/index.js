import React, {useEffect, useState} from 'react';
import {
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
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PostService, {PostServiceError} from "../../../services/post.service";
import CategoryService, {CategoryServiceError} from "../../../services/category.service";
import { useHistory } from "react-router-dom";
import swal from "sweetalert2";

const PostForm  = props => {
  const history = useHistory();
  const [CategoryList, setCategoryList] = useState([]);
  const [Post, setPost] = useState({
    name: '',
    description: '',
    category_id: 0,
    thumbnail: '',
    content: ''
  });
  const [imgPreview, setimgPreview] = useState([]);

  const fetchPost = async (id) => {
    try {
      const response = await PostService.get(id);
      setPost(response.data);
      setimgPreview(Post.full_path);
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

  const handleSubmitSave = async () => {
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
      const response = await PostService.edit(Post.id,formData);
      if(response.error){
        swal.fire({
          title: 'Error',
          icon: 'warning',
        })
      }
      else{
        swal.fire({
          title: 'Post updated',
          icon: 'success',
        })
      }
      return response;
    } catch(e) {
      if(e instanceof PostServiceError){

      }
    }
  };

  const handleSubmitAdd = async () => {
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
            history.push('/posts/list');
          }
        })
      }
      return response;
    } catch(e) {
      if(e instanceof PostServiceError){

      }
    }
  };
  useEffect(() => {
    fetchPost(props.match.params.id);
    fetchCategories();
  },[Post.id]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>{Post.id ? 'Edit Post Form' : 'Add Post Form'}</strong>
            </CardHeader>
            <CardBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Title</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name-input" defaultValue={Post.name} name="name" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="description-input" defaultValue={Post.description} name="description" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="category_id" id="select" defaultValue={Post.category_id} onChange={(e) => handleChange(e)}>
                      <option value="0">Please select category</option>
                      {CategoryList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">File input</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <div className="file-input-section">
                      { Post.thumbnail !== '' && <img className="preview-thumbnail" src={imgPreview}/>}
                      <Input type="file" id="file-input" name="file-input" onChange={(e) => previewFile(e.target.files)}/>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Content</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <ReactQuill theme="snow" value={Post.content} modules={editorSetting.modules} name="content" onChange={(e) => handleChangeEditor(e)}/>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={() => Post.id ? handleSubmitSave() : handleSubmitAdd()}><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button size="sm" color="danger" onClick={() => history.push('/posts/list')}><i className="fa fa-ban"></i> Cancel</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );

}

export default PostForm;
