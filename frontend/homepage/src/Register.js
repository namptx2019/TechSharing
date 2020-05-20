import React, { useState } from "react";
import { Formik } from "formik";
import UserService, { UserServiceError } from "../src/services/user.service"
import StyledWrapper from "./Styles";

const LogIn = props => {
    const [long, longEnough] = useState(false);
    const [number, hasNumber] = useState(false);
    const [User, setUser] = useState({});
    const [checkPassword, setCheckPass] = useState();


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

    const onCheckPassword = (checkPass) => {
        setCheckPass(checkPass);
    }

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
                        <h1>SIGN UP</h1>
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
                                Rewrite your password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={onCheckPassword}
                            />

                            <label>
                                Your gender:    
                                <select style={{width: '100px', height: '30px', borderRadius: '10px', fontSize: '15px' , marginLeft: '20px'}} value={values.gender}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>

                            <label htmlFor="phone">
                                Your phone number
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                value={values.phone}
                            />

                            <label htmlFor="birthdate">
                                Your date of birth
                            </label>
                            <input
                                id="phone"
                                type="date"
                                name="phone"
                                onChange={handleChange}
                                value={values.date_of_birth}
                            />

                            <label htmlFor="working_place">
                                Your working place
                            </label>
                            <input
                                id="working_place"
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                value={values.working_place}
                            />
                            
                            <button type="submit" disabled={isSubmitting}>Register</button>
                        </form>
                    </>
                )}
            </Formik>
        </StyledWrapper>
    );
};

export default LogIn;
