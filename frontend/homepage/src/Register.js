import React, { useState } from "react";
import { Formik } from "formik";
import UserService, { UserServiceError } from "../src/services/user.service"
import StyledWrapper from "./Styles";

const LogIn = props => {
    const [long, longEnough] = useState(false);
    const [number, hasNumber] = useState(false);
    const [User, setUser] = useState({});


    const handleSubmit = async (data) => {
        try {
            const response = await UserService.register(data);
            console.log(response.message);
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
                            <label htmlFor="username">Your user name</label>
                            <input
                                autoFocus
                                id="user"
                                type="text"
                                name="username"
                                onChange={handleChange}
                                value={values.username}
                            />

                            <label htmlFor="email">Your email account</label>
                            <input
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
                            {/*<button type="submit" onClick={() => handleSubmit(User)}>LOG IN </button>*/}
                            <button type="submit" disabled={isSubmitting}>Register</button>
                        </form>
                    </>
                )}
            </Formik>
        </StyledWrapper>
    );
};

export default LogIn;
