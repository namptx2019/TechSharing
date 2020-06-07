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
import { useHistory } from "react-router-dom";
import swal from "sweetalert2";

const AddSeries  = props => {
  const history = useHistory();
  const [CategoryList, setCategoryList] = useState([]);
  const [Series, setSeries] = useState({
    name: '',
    desc: '',
    category_id: 0,
    poster: ''
  });
  const [imgPreview, setimgPreview] = useState([]);

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

  const handleSubmitAdd = async () => {
    let formData = new FormData();
    if (Series.poster.name) {
      formData.append('poster', Series.poster);
    }
    formData.append('desc', Series.desc);
    formData.append('category_id', Series.category_id);
    formData.append('name', Series.name);
    formData.append('status', 1);
    try {
      const response = await SeriesService.create(formData);
      if(response.error){
        swal.fire({
          title: 'Error',
          icon: 'warning',
        })
      }
      else{
        swal.fire({
          title: 'Series created',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            history.push('/series/' + response.data.id);
          }
        })
      }
      return response;
    } catch(e) {
      if(e instanceof SeriesServiceError){

      }
    }
  };
  useEffect(() => {
    fetchCategories();
  },[]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Add Series Form</strong>
            </CardHeader>
            <CardBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Series name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name-input" name="name" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="description-input" name="desc" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
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
              <Button type="submit" size="sm" color="primary" onClick={() => handleSubmitAdd()}><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button size="sm" color="danger" onClick={() => history.push('/series/list')}><i className="fa fa-ban"></i> Cancel</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );

}

export default AddSeries;
