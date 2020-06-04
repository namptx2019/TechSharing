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

const ListPosts  = ({}) => {
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
    // fetchCategories();
  },[]);

  return (
    <Row>
      <Col xs="12" sm="12">
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
    </Row>
  );

}

export default ListPosts;
