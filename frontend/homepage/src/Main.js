import React, { useState } from "react";
import { Formik } from "formik";
import UserService, { UserServiceError } from "../src/services/user.service"
import StyledWrapper from "./Styles";
import { Container, Row, Col } from 'reactstrap';

const Main = ({user}) => {

    const [User, setUser] = useState(user);

  return (
      <Container>
          <StyledWrapper>
          <h2>USER PROFILE</h2>
          <img src={require('./ava.jpg')} style={{borderRadius:'200px', width:'100px', height: '100px'}}/>
          <form>
              <Row style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row'}}>
                <Col>
                    <label htmlFor="username">Your user name</label>
                    <input
                        autoFocus
                        id="user"
                        type="text"
                        disabled
                        name="username"
                        value='Name'
                    />
                </Col>
                    
                <Col>
                    <label htmlFor="email">Your email account</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        disabled
                        value='nam@abc'
                    />
                </Col>
              </Row>
                



                <label>
                    Your gender:    
                    <select disabled style={{width: '100px', height: '30px', borderRadius: '10px', fontSize: '15px' , marginLeft: '20px'}} value={('Male')}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>

                <div>
                    <label htmlFor="phone">
                        Your phone number
                    </label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        disabled
                        value='123456'
                    />
                </div>

                <div>
                    <label htmlFor="birthdate">
                        Your date of birth
                    </label>
                    <input
                        id="phone"
                        type="date"
                        name="phone"
                        disabled
                        value={Date.now}
                    />
                </div>

                <div>
                    <label htmlFor="working_place">
                        Your working place
                    </label>
                    <input
                        id="working_place"
                        type="text"
                        name="phone"
                        disabled
                        value='HCM CITY'
                    />
                </div>

            </form>
          </StyledWrapper>
      </Container>
  );
};

export default Main;
