import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import UserService, { UserServiceError } from "../../services/user.service";
import { Input, FormFeedback } from 'reactstrap';
import Form from 'react-validation/build/form';
import { useHistory } from "react-router-dom";
import swal from "sweetalert2";
import DEFAULT_AVATAR from "../../static/images/default-avatar.png"

const EditProfile = () => {

    const history = useHistory();
    const [User, setUser] = useState({
        email: '',
        role_id: 2,
        avatars: [],
        phone: '',
        gender: 1,
        working_place: '',
        date_of_birth: ''
      });
     
      const [Password, setPassword] = useState('');
      const [error, setError] = useState([]);
      const [ConfirmPassword, setConfirmPassword] = useState('');
      const [GenderList, setGenderList] = useState([
        {
          id: 0,
          name: 'Male'
        },
        {
          id: 1,
          name: 'Female'
        },
        {
          id: 2,
          name: 'Other'
        }
      ]);
      const [imgPreview, setimgPreview] = useState([DEFAULT_AVATAR]);
    
      const fetchUser = async () => {
        try{
            const response = await UserService.getUserInfo();
            setUser(response.data);
            if(User.avatars?.length !== 0){
                setimgPreview(User.avatars[0].full_path);
            }
        }
        catch(e){
            alert('Exception detail:' + e);
        }
    }
    
        const minPasswordLength = (value) => {
        if (value.trim().length < 8) {
            return <small className="form-text text-danger">Password must be at least 8 characters long</small>;
        }
      }
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        User[name] = value;
      }
    
      const handleChangePassword = (event) => {
        const { value } = event.target;
        setPassword(value)
          console.log(User);
      }
    
      const handleChangeConfirmPass = (event) => {
        const { value } = event.target;
        setConfirmPassword(value)
      }
    
      const previewFile = (file) => {
        if (file && file.item(0)) {
          const reader = new FileReader();
          reader.onload = function(e) {
            setimgPreview(e.target['result']);
          };
          reader.readAsDataURL(file.item(0));
        }
        setUser((prevState) =>
          ({
            ...prevState,
            avatars: file.item(0)
          }));
    
      }
    
      const handleSubmitSave = async () => {
        let formData = new FormData();
        if (User.avatars?.name) {
          formData.append('avatar', User.avatars);
        }
        formData.append('email', User.email);
        formData.append('role_id', User.role_id);
        formData.append('gender', User.gender);
        formData.append('phone', User.phone);
        formData.append('working_place', User.working_place);
        formData.append('date_of_birth', User.date_of_birth);
        formData.append('status', 1);

        if(Password !== ''){
          if(ConfirmPassword !== Password){
            setError(['Confirm password are not match']);
            swal.fire({
                title: 'Error',
                icon: 'warning',
            })
          }
          else{
            formData.append('password', Password);
            
            try {
              const response = await UserService.update(User.uuid,formData);
              if(response.error){
                swal.fire({
                    title: 'Error',
                    icon: 'warning',
                })
            }
            else{
                swal.fire({
                    title: 'User updated',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        history.push('/profile/me');
                    }
                })
            }
              
              return response;
            } catch(e) {
              if(e instanceof UserServiceError){
    
              }
            }
          }
    
        }
        else{
          try {
            const response = await UserService.update(User.uuid,formData);
            if(response.error){
                swal.fire({
                    title: 'Error',
                    icon: 'warning',
                })
            }
            else{
                swal.fire({
                    title: 'User updated',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.value) {
                        history.push('/profile/me');
                    }
                })
            }
          } catch(e) {
            if(e instanceof UserServiceError){
                alert('exception: ' + e);
            }
          }
        }
      };
    
      useEffect(() => {
        fetchUser();
      },[User.username]);

    return(
        <div className="profile-info page-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-5 mb-4">
                        <div className="general-info box-shadow">
                            <div className="general-info-resume d-flex flex-xl-column justify-content-start align-items-start">
                                <div className="general-info-resume-ava">
                                    <div className="thumb">
                                        <label for="avatar">
                                            <img id="previewAvatar" src={imgPreview}/>
                                        </label>
                                        <input type="file" name="avatar" id="avatar" className="d-none" accept="image/*" onChange={(e) => previewFile(e.target.files)}/>
                                    </div>
                                </div>
                                <div className="general-info-resume-intro">
                                    <h1 className="username">{User.username}</h1>
                                </div>
                            </div>
                            <div className="general-info-reaction text-center">
                                <div className="general-info-reaction-item">
                                    <div className="general-info-reaction-item-title">
                                        Score
                                    </div>
                                    <div className="general-info-reaction-item-content">
                                        {User.score}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:'20px'}}>
                            <button type="submit" className="btn nav-button btn-success"  onClick={() =>handleSubmitSave() }><i className="fa fa-dot-circle-o"></i> Save</button>
                            <button size="sm" className="btn nav-button btn-secondary" onClick={() => history.push('/profile/me')}><i className="fa fa-ban"></i> Cancel</button>
                        </div>

                    </div>

                    <div className="col-12 col-xl-7 mb-4">
                        <div className="detail-info box-shadow">
                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Username</span>
                                </div>
                                <div className="col-8">
                                    <Input  type="text" className="field-value" id="name-input" placeholder={User.username}  disabled/>
                                </div>
                            </div>
                            <hr/>

                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Email</span>
                                </div>
                                <div className="col-8">
                                    <Input type="text" className="field-value" id="email-input"  placeholder={User.email} disabled/>
                                </div>
                            </div>
                            <hr />

                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Gender</span>
                                </div>
                                <div className="col-8">
                                    <Input type="select" className="field-value" name="gender" id="select" defaultValue={User.gender} onChange={(e) => handleChange(e)}>
                                        <option value="0" style={{width: '100px'}}>Please select gender</option>
                                        {GenderList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                    </Input>
                                </div>

                            </div>
                            <hr/>

                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Phone number</span>
                                </div>
                                <div className="col-8">
                                    <Input type="text" className="field-value" id="phone-input" defaultValue={User.phone} name="phone" onChange={(e) => handleChange(e)}/>
                                </div>
                            </div>
                            <hr/>

                            <div className="row" >
                                <div className="col-4">
                                    <span className="text-field">Day of birth</span>
                                </div>
                                <div className="col-8">
                                    <Input type="date" className="field-value" id="dob-input" defaultValue={User.date_of_birth} name="date_of_birth" onChange={(e) => handleChange(e)}/>
                                </div>
                            </div>
                            <hr />


                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Working place</span>
                                </div>
                                <div className="col-8">
                                    <Input type="text" className="field-value" id="working-place-input" defaultValue={User.working_place} name="working_place" onChange={(e) => handleChange(e)}/>
                                </div>
                            </div>
                            <hr/>

                            <div className="row">
                                <div className="col-4">
                                    <span className="text-field">Password</span>
                                </div>
                                <div className="col-8 mb-2">
                                    <Input 	type="password"
                                                name="password"
                                                className="field-value"
                                                onChange={(e) => handleChangePassword(e)}
                                                validations={[minPasswordLength]}
                                                />
                                </div>

                                <div className="col-4">
                                    <span className="text-field">Confirm password</span>
                                </div>
                                <div className="col-8">
                                    <Input type="password" id="password-input" name="name" onChange={(e) => handleChangeConfirmPass(e)} className={error.length !== 0 ? 'is-invalid' : ''} />
                                        {error.length !== 0 && <FormFeedback>Confirm password are not match</FormFeedback>}
                                </div>
                            </div>
                            <hr/>
                            
                        </div>
                    </div>        
                </div>

            </div>
        </div>
    );
}

export default EditProfile;
