import React, { useState } from "react";
import { Formik } from "formik";
import UserService, { UserServiceError } from "../src/services/user.service"
import StyledWrapper from "./Styles";
import { useHistory } from "react-router-dom";

const LogIn = props => {
  const [long, longEnough] = useState(false);
  const [number, hasNumber] = useState(false);
  const [User, setUser] = useState({});

  const history = useHistory();

    const handleSubmit = async (data) => {
        try {
            const response = await UserService.login(data);
            console.log(response.message);
            history.push("/main");
        } catch(e) {
            if(e instanceof UserServiceError){
                this.error = e.message;
            }
        }
    };


  return (
    <StyledWrapper>
 <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
              handleSubmit(values);
              setSubmitting(false);
          }, 400);
      }}
    >
      {({ errors, values, handleChange, handleSubmit, isSubmitting }) => (
        <>
          <h1>Log-In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Your email account</label>
            <input
              autoFocus
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <label htmlFor="password">
              Your password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />


            <button type="submit">LOG IN </button>
            
          </form>
        </>
      )}
    </Formik>
    </StyledWrapper>
   
  );
};

export default LogIn;
