import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import SeriesService, {SeriesServiceError} from "../../../services/series.service";
import CategoryService, {CategoryServiceError} from "../../../services/category.service";
import PostService, {PostServiceError} from "../../../services/post.service";
import { useHistory } from "react-router-dom";
import swal from "sweetalert2";

const EditSeries  = props => {
  const history = useHistory();
  const [PostList, setPostList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [PostSeries, setPostSeries] = useState([]);
  const [Series, setSeries] = useState({
    name: '',
    desc: '',
    category_id: 0,
    poster: ''
  });
  const [imgPreview, setimgPreview] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await PostService.getList();
      setPostList(response.data);
      return response;
    } catch(e) {
      if(e instanceof PostServiceError){

      }
    }
  }

  const fetchSeries = async (id) => {
    try {
      const response = await SeriesService.get(id);
      setSeries(response.data);
      setimgPreview(Series.full_path);
      return response;
    } catch(e) {
      if(e instanceof SeriesServiceError){

      }
    }
  }
  const getPostSeries = async () => {
    try {
      const response = await SeriesService.getListPost(props.match.params.id);
      setPostSeries(response.data);
      return response;
    } catch(e) {
      if(e instanceof SeriesServiceError){

      }
    }
  }
  const addPost = async (id) => {
    let dataSend = {
      series_id: Series.id,
      post_id: id
    };
    try {
      const response = await SeriesService.addPost(dataSend);
      if(response.data){
        getPostSeries();
        swal.fire({
          title: 'Post added to Series',
          icon: 'success',
        })
      }
      return response;
    } catch(e) {
      if(e instanceof SeriesServiceError){

      }
    }
  }

  const removePost = async (id) => {
    let dataSend = {
      series_id: Series.id,
      post_id: id
    };
    try {
      const response = await SeriesService.removePost(dataSend);
      if(response.deleted){
        getPostSeries();
        swal.fire({
          title: 'Post removed from Series',
          icon: 'success',
        })
      }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    Series[name] = value;
  }

  const previewFile = (file) => {
    if (file && file.item(0)) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setimgPreview(e.target['result']);
      };
      reader.readAsDataURL(file.item(0));
    }
    setSeries((prevState) =>
      ({
        ...prevState,
        poster: file.item(0)
      }));

  }

  const handleSubmitSave = async () => {
    let formData = new FormData();
    if (Series.poster.name) {
      formData.append('poster', Series.poster);
    }
    formData.append('desc', Series.desc);
    formData.append('category_id', Series.category_id);
    formData.append('name', Series.name);
    formData.append('status', 1);
    try {
      const response = await SeriesService.edit(Series.id,formData);
      if(response.error){
        swal.fire({
          title: 'Error',
          icon: 'warning',
        })
      }
      else{
        swal.fire({
          title: 'Series updated',
          icon: 'success',
        })
      }
      return response;
    } catch(e) {
      if(e instanceof SeriesServiceError){

      }
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchSeries(props.match.params.id);
    fetchCategories();
    getPostSeries();
  },[Series.id]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Edit Series Form</strong>
            </CardHeader>
            <CardBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Title</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name-input" defaultValue={Series.name} name="name" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="description-input" defaultValue={Series.desc} name="description" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="category_id" id="select" defaultValue={Series.category_id} onChange={(e) => handleChange(e)}>
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
                      { Series.poster !== '' && <img className="preview-thumbnail" src={imgPreview}/>}
                      <Input type="file" id="file-input" name="file-input" onChange={(e) => previewFile(e.target.files)}/>
                    </div>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={() => handleSubmitSave() }><i className="fa fa-dot-circle-o"></i> Save</Button>
              <Button size="sm" color="danger" onClick={() => history.push('/series/list')}><i className="fa fa-ban"></i> Cancel</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Posts in Series</strong>
            </CardHeader>
            <CardBody>
              {PostSeries.map(item =>
                <div className="post-item-accordion post-item-accordion-added" onClick={()=>removePost(item.id)}>
                <span className="post-item-accordion__icon">
                  <i className="fa fa-file-text-o"></i>
                </span>
                  <span className="post-item-accordion__title">
                  {item.name}
                </span>
                  <span className="post-item-accordion__button">
                  <i className="icon-close"></i>
                </span>
                </div>
              )}
            </CardBody>
          </Card>

        </Col>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>All Posts</strong>
            </CardHeader>
            <CardBody>
              {PostList.map(item =>
                <div className="post-item-accordion" onClick={()=>addPost(item.id)}>
                <span className="post-item-accordion__icon">
                  <i className="fa fa-file-text-o"></i>
                </span>
                <span className="post-item-accordion__title">
                  {item.name}
                </span>
                <span className="post-item-accordion__button">
                  <i className="icon-plus"></i>
                </span>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );

}

export default EditSeries;
