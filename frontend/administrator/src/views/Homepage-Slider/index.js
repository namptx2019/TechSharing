import React, { Component, useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col,
  FormGroup, Input,
  Label,
  Row,
  Table,
  Modal,
  ModalHeader, ModalBody, ModalFooter, Form
} from 'reactstrap';
import SliderService, {SliderServiceError} from "../../services/homepage-slider.service";
import swal from 'sweetalert2'

const HomepageSlider  = ({}) => {
  const [Slider, setSlider] = useState({});
  const [SliderList, setSliderList] = useState([]);
  const [error, setError] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [SelectedSlider, setSelectedSlider] = useState({});
  const [imgPreviewAdd, setimgPreviewAdd] = useState([]);
  const [imgPreviewEdit, setimgPreviewEdit] = useState([]);

  const handleChangeAdd = (event) => {
    event.persist();
    const { name, value } = event.target;
    Slider[name] = value;
  };
  const handleChangeEdit = (event) => {
    event.persist();
    const { name, value } = event.target;
    SelectedSlider[name] = value;
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  }

  const toggleAdd = () => {
    setModalAdd(!modalAdd);
  }

  const fetchSliders = async () => {
    try {
      const response = await SliderService.get();
      setSliderList(response.data);
      return response;
    } catch(e) {
      if(e instanceof SliderServiceError){

      }
    }
  }

  const getSelectedSlider = (row) =>{
    setModalEdit(!modalEdit);
    setSelectedSlider(row);
    setimgPreviewEdit(row.thumbnail_fullpath);
  }

  const deleteSelected = (row) =>{
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        try {
          const response = SliderService.delete(row.id);
          fetchSliders();
          return response;
        } catch(e) {
          if(e instanceof SliderServiceError){

          }
        }
      }
    })
  }

  const previewFileEdit = (file) => {
    if (file && file.item(0)) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setimgPreviewEdit(e.target['result']);
      };
      reader.readAsDataURL(file.item(0));
    }
    setSelectedSlider((prevState) =>
      ({
        ...prevState,
        thumbnail: file.item(0)
      }));
  }

  const previewFileAdd = (file) => {
    if (file && file.item(0)) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setimgPreviewAdd(e.target['result']);
      };
      reader.readAsDataURL(file.item(0));
    }
    setSlider((prevState) =>
      ({
        ...prevState,
        thumbnail: file.item(0)
      }));
  }

  const items = SliderList.map(item => {
    return (
      <tr key={item.id}>
        <td>
          <img className="image-thumbnail" src={item.thumbnail_fullpath}/>
        </td>
        <td>{item.title}</td>
        <td>{item.link}</td>
        <td>{item.desc}</td>
        <td>
          <Button color="warning" size="sm" onClick={() => getSelectedSlider(item)}>Edit</Button>
          <Button color="danger" size="sm" className="ml-2" onClick={() => deleteSelected(item)}>Delete</Button>
        </td>
      </tr>
    )
  })

  const handleSubmitAdd = async () => {
    let formData = new FormData();
    if (Slider.thumbnail.name) {
      formData.append('image', Slider.thumbnail);
    }
    formData.append('title', Slider.title);
    formData.append('link', Slider.link);
    formData.append('desc', Slider.desc);
    formData.append('status', 1);
    try {
      const response = await SliderService.create(formData);
      toggleAdd();
      fetchSliders();
      if(response.error){
        setError(response.error);
      }
      return response;
    } catch(e) {
      if(e instanceof SliderServiceError){

      }
    }
  };

  const handleSubmitEdit = async (id) => {
    let formData = new FormData();
    if (SelectedSlider.thumbnail.name) {
      formData.append('image', SelectedSlider.thumbnail);
    }
    formData.append('title', SelectedSlider.title);
    formData.append('link', SelectedSlider.link);
    formData.append('desc', SelectedSlider.desc);
    try {
      const response = await SliderService.edit(id,formData);
      toggleEdit();
      fetchSliders();
      if(response.error){
        setError(response.error);
      }
      return response;
    } catch(e) {
      if(e instanceof SliderServiceError){

      }
    }
  };

  useEffect(() => {
    fetchSliders();
  },[]);

  return (
    <div>
      <div className="mb-2">
        <Button color="primary" className="btn-pill" onClick={() => toggleAdd()}>
          <i className="fa fa-plus mr-1"></i>Add Slider
        </Button>
      </div>
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Table responsive hover>
              <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Link</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {items}
              </tbody>
            </Table>
          </Card>
        </Col>
        <Modal isOpen={modalEdit} toggle={toggleEdit}>
          <ModalHeader toggle={toggleEdit}>Edit Slider</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Title</Label>
                  <Input type="text" id="name" name="title" defaultValue={SelectedSlider.title} onChange={(e) => handleChangeEdit(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Link</Label>
                  <Input type="text" id="name" name="link" defaultValue={SelectedSlider.link} onChange={(e) => handleChangeEdit(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Description</Label>
                  <Input type="textarea" rows="5" id="name" name="desc" defaultValue={SelectedSlider.desc} onChange={(e) => handleChangeEdit(e)} />
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">Thumbnail</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <div className="input-user-ava">
                      <Col xs="12" md="12">
                        { SelectedSlider.thumbnail !== '' && <img className="preview-ava" src={imgPreviewEdit}/>}
                      </Col>
                      <Input type="file" className="d-none" id="add-ava" name="file-input" onChange={(e) => previewFileEdit(e.target.files)}/>
                      <label htmlFor="add-ava" className="btn btn-outline-success m-btn m-btn--icon mb-0 mr-2">
                            <span>
                                <i className="cui-cloud-upload"></i> Upload
                            </span>
                      </label>
                    </div>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleSubmitEdit(SelectedSlider.id)}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalAdd} toggle={toggleAdd}>
          <ModalHeader toggle={toggleAdd}>Add Slider</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Title</Label>
                  <Input type="text" id="name" name="title" onChange={(e) => handleChangeAdd(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Link</Label>
                  <Input type="text" id="name" name="link" onChange={(e) => handleChangeAdd(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Description</Label>
                  <Input type="textarea" rows="5" id="name" name="desc" onChange={(e) => handleChangeAdd(e)} />
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">Thumbnail</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <div className="input-user-ava">
                      <Col xs="12" md="12">
                        { Slider.medal !== '' && <img className="preview-ava" src={imgPreviewAdd}/>}
                      </Col>
                      <Input type="file" className="d-none" id="add-ava" name="file-input" onChange={(e) => previewFileAdd(e.target.files)}/>
                      <label htmlFor="add-ava" className="btn btn-outline-success m-btn m-btn--icon mb-0 mr-2">
                            <span>
                                <i className="cui-cloud-upload"></i> Upload
                            </span>
                      </label>
                    </div>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleSubmitAdd()}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleAdd}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Row>
    </div>
  );

}

export default HomepageSlider;
