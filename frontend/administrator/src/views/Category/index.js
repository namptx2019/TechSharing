import React, { Component, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col,
  FormGroup, Input,
  Label,
  Row
} from 'reactstrap';
import Select from 'react-select'
import CategoryService, {CategoryServiceError} from "../../services/category.service";

const Category  = ({}) => {
  const [Category, setCategory] = useState({});
  const [error, setError] = useState([]);
  const handleChange = (event) => {
    Category[event.target.name] = event.target.value;
  };

  const handleSubmit = async (data) => {
    try {
      const response = await CategoryService.create(data);
      if(response.error){
        setError(response.error);
      }
      return response;
    } catch(e) {
      if(e instanceof CategoryServiceError){

      }
    }
  };
  return (
    <Row>
      <Col xs="12" sm="4">
        <Card>
          <CardHeader>
            <strong>Add category</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" placeholder="Enter category's name" required onChange={(e) => handleChange(e)} />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button type="submit" size="sm" color="primary" onClick={() => handleSubmit(Category)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
          </CardFooter>
        </Card>
      </Col>
      <Col xs="12" sm="8">
        <Card>
          <CardHeader>
            <strong>Category List</strong>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="company">Name</Label>
              <Input type="text" id="company" placeholder="Enter your company name" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="vat">Status</Label>
              <Input type="text" id="vat" placeholder="DE1234567890" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="street">Creator</Label>
              <Input type="text" id="street" placeholder="Enter street name" />
            </FormGroup>
            <FormGroup row className="my-0">
              <Col xs="8">
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input type="text" id="city" placeholder="Enter your city" />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input type="text" id="postal-code" placeholder="Postal Code" />
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="country">Country</Label>
              <Input type="text" id="country" placeholder="Country name" />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );

}

export default Category;
