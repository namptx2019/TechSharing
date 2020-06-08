import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  FormFeedback,
  Label,
  Row,
} from 'reactstrap';
import UserService, {UserServiceError} from "../../../services/user.service";
import { useHistory } from "react-router-dom";
import swal from "sweetalert2";
import defaultAva from "../../../assets/img/default-ava.jpg"
import RoleService, {RoleServiceError} from "../../../services/role.service";

const UserForm  = props => {
  const history = useHistory();
  const [User, setUser] = useState({
    username: '',
    email: '',
    role_id: 5,
    avatars: [],
    phone: '',
    gender: 1,
    working_place: '',
    date_of_birth: ''
  });
  const [RoleList, setRoleList] = useState([]);
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
  const [imgPreview, setimgPreview] = useState([]);


  const fetchUser = async (uuid) => {
    try {
      const response = await UserService.get(uuid);
      setUser(response.data);
      setimgPreview(User.avatars[0].full_path);
      return response;
    } catch(e) {
      if(e instanceof UserServiceError){

      }
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await RoleService.getList();
      setRoleList(response.data);
      return response;
    } catch(e) {
      if(e instanceof RoleServiceError){
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    User[name] = value;
  }

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value)
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

  const deleteAva = () => {
    setUser((prevState) =>
      ({
        ...prevState,
        avatars: []
      }));
  }

  const handleSubmitSave = async () => {
    let formData = new FormData();
    if (User.avatars?.name) {
      formData.append('avatar', User.avatars);
    }
    formData.append('role_id', User.role_id);
    formData.append('gender', User.gender);
    formData.append('phone', User.phone);
    formData.append('working_place', User.working_place);
    formData.append('date_of_birth', User.date_of_birth);
    formData.append('status', 1);
    if(Password !== ''){
      if(ConfirmPassword !== Password){
        setError(['Confirm password are not match']);
      }
      else{
        formData.append('password', Password);
        try {
          const response = await UserService.edit(User.uuid,formData);
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
        const response = await UserService.edit(User.uuid,formData);
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
          })
        }
        return response;
      } catch(e) {
        if(e instanceof UserServiceError){

        }
      }
    }
  };

  const handleSubmitAdd = async () => {
    setError([]);
    let formData = new FormData();
    if (User.avatars?.name) {
      formData.append('avatar', User.avatars);
    }
    if(User.username === ''){
      setError(['Username is required']);
      return;
    }
    if(User.email === ''){
      setError(['Email is required']);
      return;
    }
    if(User.date_of_birth === ''){
      setError(['Date of birth is required']);
      return;
    }
    if(Password !== ''){
      if(Password.length <= 8){
        setError(['Password must be at least 8 characters']);
        return
      }
      if(ConfirmPassword.length <= 8){
        setError(['Confirm password must be at least 8 characters']);
        return
      }
      if(ConfirmPassword !== Password){
        setError(['Confirm password are not match']);
        return
      }
    }
    else {
      setError(['Password is required']);
      return;
    }
    formData.append('username', User.username);
    formData.append('email', User.email);
    formData.append('role_id', User.role_id);
    formData.append('gender', User.gender);
    formData.append('phone', User.phone);
    formData.append('working_place', User.working_place);
    formData.append('date_of_birth', User.date_of_birth);
    formData.append('status', 1);
    formData.append('password', Password);
    formData.append('confirm_password', ConfirmPassword);
    try {
      const response = await UserService.create(formData);
      if(response.error){
        swal.fire({
          title: 'Error',
          icon: 'warning',
        })
      }
      else{
        swal.fire({
          title: 'User created',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            history.push('/users/list');
          }
        })
      }
      return response;
    } catch(e) {
      if(e instanceof UserServiceError){

      }
    }

  };
  useEffect(() => {
    fetchUser(props.match.params.uuid);
    fetchRoles();
  },[User.uuid]);

  return (
    <div className="animated fadeIn">
      { error.length !== 0 &&
      <Alert color="danger">
        {error}
      </Alert>
      }
      <Row>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Avatar Section</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col xs="12" md="12">
                  <div className="input-user-ava">
                    <Col xs="12" md="12">
                      { User.avatars.length !== 0 && <img className="preview-ava" src={imgPreview}/>}
                      { User.avatars.length === 0 && <img className="preview-ava" src={defaultAva}/>}
                    </Col>
                    <Input type="file" className="d-none" id="add-ava" name="file-input" onChange={(e) => previewFile(e.target.files)}/>
                    <label htmlFor="add-ava" className="btn btn-outline-success m-btn m-btn--icon mb-0 mr-2">
                        <span>
                            <i className="cui-cloud-upload"></i> Upload
                        </span>
                    </label>
                    <Input type="button" className="d-none" id="delete-ava" onClick={() => deleteAva()}/>
                    <label htmlFor="delete-ava" className="btn btn-outline-danger m-btn m-btn--icon mb-0">
                        <span>
                            <i className="cui-circle-x"></i> Delete
                        </span>
                    </label>
                  </div>
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Details Section</strong>
            </CardHeader>
            <CardBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Role</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="role_id" id="select" defaultValue={User.role_id} onChange={(e) => handleChange(e)}>
                      <option value="0">Please select role</option>
                      {RoleList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Username</Label>
                  </Col>
                  <Col xs="12" md="9">
                    {
                      User.uuid && <Input  type="text" id="name-input" placeholder={User.username} name="name" disabled/>
                    }
                    {
                      !User.uuid && <Input  type="text" id="name-input" name="username" onChange={(e) => handleChange(e)}/>
                    }
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Email</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="email-input" placeholder={User.email} name="email" disabled/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Gender</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="gender" id="select" defaultValue={User.gender} onChange={(e) => handleChange(e)}>
                      <option value="0">Please select gender</option>
                      {GenderList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="dob-input">Date of birth</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="date" id="dob-input" defaultValue={User.date_of_birth} name="date_of_birth" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="phone-input">Phone</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="phone-input" defaultValue={User.phone} name="phone" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="working-place-input">Working place</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="working-place-input" defaultValue={User.working_place} name="working_place" onChange={(e) => handleChange(e)}/>
                  </Col>
                </FormGroup>

              </Form>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Password</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="password" id="password-input" name="password" onChange={(e) => handleChangePassword(e)}/>
                    <FormText>Password must be at least 8 characters</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Confirm password</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="password" id="password-input" name="name" onChange={(e) => handleChangeConfirmPass(e)} className={ConfirmPassword !== Password ? 'is-invalid' : ''} />
                    {ConfirmPassword !== Password && <FormFeedback>Confirm password are not match</FormFeedback>}
                  </Col>
                </FormGroup>
              </FormGroup>
            </CardBody>
          </Card>
          <Button type="submit" size="sm" color="primary" onClick={() => User.uuid ? handleSubmitSave() : handleSubmitAdd()}><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button size="sm" color="danger" onClick={() => history.push('/posts/list')}><i className="fa fa-ban"></i> Cancel</Button>
        </Col>
      </Row>
    </div>
  );

}

export default UserForm;
