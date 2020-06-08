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
import moment from 'moment'
import DEFAULT_AVATAR from '../../static/images/default-avatar.png'
const Register = () => {
    const [User, setUser] = useState({
      role_id: 5,
      avatars: [],
      phone: '',
      gender: 1,
      working_place: '',
      date_of_birth: ''
    });
    const [step, setStep] = useState(0);
    const [FormValid, setFormValid] = useState([]);
    const [Check, setCheck] = useState([]);
    const [Password, setPassword] = useState('');
    const [DOB, setDOB] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [imgPreview, setimgPreview] = useState(DEFAULT_AVATAR);

    const emailRequired = (value) => {
        if (isEmpty(value)) {
            return <small className="form-text text-danger">Email is required</small>;
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
        if (value.trim().length < 8) {
            return <small className="form-text text-danger">Password must be at least 8 characters long</small>;
        }
      }

    const handleChangeDOB = (date) => {
      setDOB(date);
    }

    const handleChange = (event) => {
      const { name, value } = event.target;
      User[name] = value;
    }

    const handleChangePassword = (event) => {
      setPassword(event.target.value);
    }
    const handleChangeConfirmPassword = (event) => {
      setConfirmPassword(event.target.value);
    }

  const previewImg = (file) => {
    if (file && file.item(0)) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setimgPreview(e.target['result']);
      };
      reader.readAsDataURL(file.item(0));
    }
  }

    const nextStep = () => {
      FormValid.validateAll();
      if(Check.context._errors.length === 0 && Password === ConfirmPassword){
        setStep(step +1);
      }
    }

    const onSubmit = (e) => {
      e.preventDefault();
      FormValid.validateAll();
      if ( Check.context._errors.length === 0) {
        let formData = new FormData();
        let dataValidate = FormValid.getValues();
        if (User.avatars?.name) {
          formData.append('avatar', User.avatars);
        }        
        formData.append('username', dataValidate.username);
        formData.append('email', dataValidate.email);
        formData.append('role_id', 2);
        formData.append('gender', User.gender);
        formData.append('phone', User.phone);
        formData.append('working_place', User.working_place);
        formData.append('date_of_birth', moment(DOB).format('YYYY-MM-DD'));
        formData.append('status', 1);
        formData.append('password', Password);
        formData.append('confirm_password', ConfirmPassword);
        console.log(formData);
        try {
          const response = UserService.register(formData);
          console.log(response);
        } catch(e) {
          if(e instanceof UserServiceError){

          }
        }
      }
    }

    return(
        <section className="section-block page-auth">
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
                        <Form onSubmit={e => onSubmit(e)} ref={c => { setFormValid(c)  }}>
                            <div className="page-auth-form pb-4">
                                {/* //  REGISTER STEP 0  */}
                                {step==0 && <div>
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
                                            onChange={(e) => handleChangePassword(e)}
                                            validations={[passwordRequired, minPasswordLength]}
                                            />

                                    <Input 	type="password"
                                            name="confirm_password"
                                            className="form-control"
                                            placeholder={'Confirm password'}
                                            onChange={(e) => handleChangeConfirmPassword(e)}
                                            />
                                  {Password !== ConfirmPassword && <small className="form-text text-danger">Confirm password is not match with password</small>}
                                </div>}

                                {/* // REGISTER STEP 1 */}
                                {step==1 && <div>
                                    <DatePicker selected={DOB} onChange={(date) => handleChangeDOB(date)} name="date_of_birth" dateFormat="yyyy-MM-dd"></DatePicker>

                                    <select onChange={(e) => handleChange(e)} required name="gender" className="form-control select-gender">
                                        <option value="" disabled hidden>Gender</option>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                        <option value="2">Other</option>
                                    </select>

                                    <input 	type="text"
                                            name="phone"
                                            className="form-control"
                                            onChange={(e) => handleChange(e)}
                                            placeholder={'Phone number (optional)'}/>

                                    <span className="page-auth-form-note">The phone number is for account security. It won’t be visible to others.</span>
                                </div>}

                                {/* REGISTER STEP 2 */}
                                {step == 2 && <div className="upload-ava">
                                    <label for="avatar">
                                        <div className="preview-avatar">
                                            <div className="ava box-shadow">
                                                <img id="previewAvatar" src={imgPreview}  alt=""/>
                                            </div>
                                        </div>
                                        <span>Upload Avatar</span>
                                    </label>
                                    <input type="file" name="avatar" id="avatar" className="hidden" accept="image/*" onChange={(e) => previewImg(e.target.files)}/>
                                </div>}

                                {step>0 && <button type="button" onClick={()=> setStep(step-1)} className="btn btn-secondary">Back</button>}
                                {step==0 && <button type="button" onClick={()=> nextStep()} className="btn btn-primary" >Get Started</button>}
                                {step==1 && <button type="button" onClick={()=> nextStep()} className="btn btn-primary" >Next</button>}
                                {step==2 && <button type="submit" className="btn btn-primary" >Finish</button>}

                              <CheckButton style={{ display: 'none' }} ref={c => { setCheck(c) }} />
                            </div>
                        </Form>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="right-bg">
                            <img src={require('../../static/images/thumbnail/3.png')}/>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Register;
