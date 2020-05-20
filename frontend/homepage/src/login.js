import React, { useState } from "react";
import { Formik } from "formik";


const LogIn = props => {
  const [long, longEnough] = useState(false);
  const [number, hasNumber] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={() => {
        
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
            <button type="reset">SIGN UP </button>
            
          </form>
        </>
      )}
    </Formik>
  );
};

export default LogIn;
