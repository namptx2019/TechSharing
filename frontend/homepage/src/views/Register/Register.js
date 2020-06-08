import React, { useState } from 'react';
import {
    Alert
} from 'reactstrap';
import UserService, { UserServiceError } from "../../services/user.service"
import DatePicker from "react-datepicker";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail, isEmpty } from 'validator';

import "react-datepicker/dist/react-datepicker.css";


const Register = () => {
    // const [User, setUser] = useState({});
    // const [error, setError] = useState([]);
    // const handleChange = (event) => {
    //     User[event.target.name] = event.target.value;
    // };
    // const handleSubmit = async (data) => {
    //     try {
    //         const response = await UserService.login(data);
    //         window.location.href = '/';
    //     } catch(e) {
    //         if(e instanceof UserServiceError){
    //             setError(e)
    //         }
    //     }
    // };
    const [step, setStep] = useState(0);
    const [password, setPassword] = useState();

    const emailRequired = (value) => {
        if (isEmpty(value)) {
            return <small className="form-text text-danger" style={{float: "left", paddingTop: "0"}}>Email is required</small>;
        }
      }

    const usernameRequired = (value) => {
        if (isEmpty(value)) {
            return <small className="form-text text-danger">Username is required</small>;
        }
      }

    const passwordRequired = (value) => {
        if (isEmpty(value)) {
            return <small className="form-text text-danger">Password is required</small>;
        }
      }
  
    const email = (value) => {
        if (!isEmail(value)) {
            return <small className="form-text text-danger">Invalid email format</small>;
        }
      }
  
    const minUsernameLength = (value) => {
        if (value.trim().length < 6) {
            return <small className="form-text text-danger" style={{marginTop: 0}}>Username must be at least 6 characters long</small>;
        }
      }

    const minPasswordLength = (value) => {
        if (value.trim().length < 6) {
            return <small className="form-text text-danger">Password must be at least 6 characters long</small>;
        }
      }

    const confirmPw = (value) => {
          if(value != password)
          {
            return <small className="form-text text-danger">Confirm wrong password</small>;
          }
      }

      const onSubmit = (e) => {
        e.preventDefault();
        this.form.validateAll();

        if ( this.checkBtn.context._errors.length === 0 ) {
          alert('success')
        }
    }

    return(
        <section className="section-block">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="page-auth-header">
                            {step==0 && <h3>Register</h3>}
                            {step==1 && <h3>Add more Detail</h3>}
                            {step==2 && <h3>Complete your profile</h3>}
                            {step==0 && <span className="page-auth-header-desc">Sign an new account for your future activity in our TechSharing community</span>}
                            {step==1 && <span className="page-auth-header-desc">Almost done! We need just a little more info to set up your account</span>}
                        </div>
                        <Form onSubmit={e => onSubmit(e)} >
                            <div className="page-auth-form pb-4">
                                {/* //  REGISTER STEP 0  */}
                                {step==0 && <div v-if="step == 0">
                                    <Input 	type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder={'Email'}
                                            validations={[emailRequired, email]}
                                            />
                                            
                                    <Input 	type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder={'Username'}
                                            validations={[usernameRequired, minUsernameLength]}
                                            />

                                    <Input 	type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder={'Password'}
                                            validations={[passwordRequired, minPasswordLength]}
                                            />

                                    <Input 	type="password"
                                            name="confirm_password"
                                            className="form-control"
                                            placeholder={'Confirm password'}
                                            />
                                </div>}

                                {/* // REGISTER STEP 1 */}
                                {step==1 && <div v-if="step == 1">
                                    <DatePicker name="day of birth" placeholder={'Date of birth'} dateFormat="yyyy-MM-dd"></DatePicker>

                                    <select required name="gender" className="form-control select-gender" v-model="models[1].gender">
                                        <option value="" disabled hidden>Gender</option>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                        <option value="2">Other</option>
                                    </select>

                                    <input 	type="text"
                                            name="phone"
                                            className="form-control"
                                            placeholder={'Phone number (optional)'}/>

                                    <span className="page-auth-form-note">The phone number is for account security. It won’t be visible to others.</span>
                                </div>}

                                {/* REGISTER STEP 2 */}
                                {step == 2 && <div v-if="step == 2" className="upload-ava">
                                    <label for="avatar">
                                        <div className="preview-avatar">
                                            <div className="ava box-shadow">
                                                <img id="previewAvatar" src={require('../../static/images/default-avatar.png')} alt=""/>
                                            </div>
                                        </div>
                                        <span>Upload Avatar</span>
                                    </label>
                                    <input type="file" name="avatar" id="avatar" className="hidden" accept="image/*" />
                                </div>}

                                {step>0 && <button type="button" className="btn btn-secondary">Back</button>}
                                {step==0 && <button type="button" className="btn btn-primary" >Get Started</button>}
                                {step==1 && <button type="button" className="btn btn-primary" >Next</button>}
                                {step==2 && <button type="button" className="btn btn-primary" >Finish <img width="30" v-show="loading" className="spinner" src={require('../../static/images/rolling.svg')} alt=""/></button>}


                            </div>
                        </Form>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="loginimg">
                            <img src={require('../../static/images/thumbnail/3.png')}/>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Register;
