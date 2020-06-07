import React, { useState } from 'react';
import {
    Alert
} from 'reactstrap';
import UserService, { UserServiceError } from "../../services/user.service"

const Login = () => {
    const [User, setUser] = useState({});
    const [error, setError] = useState([]);
    const handleChange = (event) => {
        User[event.target.name] = event.target.value;
    };
    const handleSubmit = async (data) => {
        try {
            console.log(data);
            const response = await UserService.login(data);
            window.location.href = '/';
        } catch(e) {
            if(e instanceof UserServiceError){
                setError(e)
            }
        }
    };
    return(
        <section className="section-block">
            <div className="container">
                <div className="row">
                    { error.length !== 0 &&
                    <Alert color="danger">
                        Wrong credentials
                    </Alert>
                    }
                    <div className="col-12 col-lg-6">
                        <div className="page-auth-header">
                            <h3>Login</h3>
                        </div>
                        <div className="page-auth-form">
                            <input placeholder="Email" type="email" name="email" className="form-control" onChange={(e)=> handleChange(e)}/>
                            <input placeholder="Password" type="password" name="password" className="form-control" onChange={(e)=> handleChange(e)}/>
                            <button type="button" className="btn btn-primary" onClick={() => handleSubmit(User)}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    );
}

export default Login;
