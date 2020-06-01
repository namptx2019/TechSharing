import React, { useState } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import '../../../scss/login.scss';
import UserService, { UserServiceError } from "../../../services/user.service"
import { TokenService } from '../../../services/token.service'
import { useHistory } from "react-router-dom";

const Login  = ({}) => {
  const [User, setUser] = useState({});
  const handleChange = (event) => {
    User[event.target.name] = event.target.value;
  };
  const history = useHistory();
  const handleSubmit = async (data) => {
    try {
      const response = await UserService.login(data);
      TokenService.saveToken(response.access_token);
      history.push("/");
    } catch(e) {
      if(e instanceof UserServiceError){
        console.log(e);
      }
    }
  };
  return (
    <div className="login-bg app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" name="email" placeholder="Email" autoComplete="email" onChange={(e) => handleChange(e)}  />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={(e) => handleChange(e)}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={() => handleSubmit(User)}>Login</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );

}

export default Login;
