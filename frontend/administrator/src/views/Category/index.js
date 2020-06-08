import React, { Component, useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col,
  FormGroup, Input,
  Label,
  Row,
  Table,
  Modal,
  ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import CategoryService, {CategoryServiceError} from "../../services/category.service";
import swal from 'sweetalert2'

const Category  = ({}) => {
  const [Category, setCategory] = useState({});
  const [CategoryList, setCategoryList] = useState([]);
  const [error, setError] = useState([]);
  const [modal, setModal] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState({});

  const handleChangeAdd = (event) => {
    event.persist();
    const { name, value } = event.target;
    Category[name] = value;
  };
  const handleChangeEdit = (event) => {
    event.persist();
    setSelectedCategory((prevState) =>
      ({
        id: prevState.id,   // keep all other key-value pairs
        name: event.target.value     // update the value of specific key
    }));
  };

  const toggle = () => {
    setModal(!modal);
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

  const getSelectedCategory = (row) =>{
    setModal(!modal);
    setSelectedCategory(row);
  }

  const deleteSelected = (row) =>{
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        try {
          const response = CategoryService.delete(row.id);
          fetchCategories();
          return response;
        } catch(e) {
          if(e instanceof CategoryServiceError){

          }
        }
      }
    })
  }


  const items = CategoryList.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.created_by.username}</td>
        <td>
          <Button color="warning" size="sm" onClick={() => getSelectedCategory(item)}>Edit</Button>
          <Button color="danger" size="sm" className="ml-2" onClick={() => deleteSelected(item)}>Delete</Button>
        </td>
      </tr>
    )
  })

  const handleSubmitAdd = async (data) => {
    try {
      const response = await CategoryService.create(data);
      fetchCategories();
      if(response.error){
        setError(response.error);
      }
      return response;
    } catch(e) {
      if(e instanceof CategoryServiceError){
        
      }
    }
  };

  const handleSubmitEdit = async (id,data) => {
    try {
      const response = await CategoryService.edit(id,data);
      toggle();
      fetchCategories();
      if(response.error){
        setError(response.error);
      }
      return response;
    } catch(e) {
      if(e instanceof CategoryServiceError){

      }
    }
  };

  useEffect(() => {
    fetchCategories();
  },[]);

  return (
    <Row>
      <Col xs="12" sm="4">
        <Card>
          <CardHeader>
            <strong>Add category</strong>
          </CardHeader>
          <CardBody>
            { error.length !== 0 &&
            <Alert color="danger">
              Wrong credentials
            </Alert>
            }
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" placeholder="Enter category's name" required onChange={(e) => handleChangeAdd(e)} />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button type="submit" size="sm" color="primary" onClick={() => handleSubmitAdd(Category)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
          </CardFooter>
        </Card>
      </Col>
      <Col xs="12" sm="8">
        <Card>
          <Table responsive hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Creator</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {items}
            </tbody>
          </Table>
        </Card>
      </Col>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit category</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" placeholder="Enter category's name" value={SelectedCategory.name} onChange={(e) => handleChangeEdit(e)} />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleSubmitEdit(SelectedCategory.id, SelectedCategory)}>Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Row>
  );

}

export default Category;
