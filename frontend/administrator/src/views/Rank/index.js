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
import RankService, {RankServiceError} from "../../services/rank.service";
import swal from 'sweetalert2'
import defaultAva from "../../assets/img/default-ava.jpg";

const Rank  = ({}) => {
  const [Rank, setRank] = useState({});
  const [RankList, setRankList] = useState([]);
  const [error, setError] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [SelectedRank, setSelectedRank] = useState({});
  const [imgPreviewAdd, setimgPreviewAdd] = useState([]);
  const [imgPreviewEdit, setimgPreviewEdit] = useState([]);

  const handleChangeAdd = (event) => {
    event.persist();
    const { name, value } = event.target;
    Rank[name] = value;
  };
  const handleChangeEdit = (event) => {
    event.persist();
    const { name, value } = event.target;
    SelectedRank[name] = value;
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  }

  const toggleAdd = () => {
    setModalAdd(!modalAdd);
  }

  const fetchRanks = async () => {
    try {
      const response = await RankService.get();
      setRankList(response.data);
      return response;
    } catch(e) {
      if(e instanceof RankServiceError){

      }
    }
  }

  const getSelectedRank = (row) =>{
    setModalEdit(!modalEdit);
    setSelectedRank(row);
    setimgPreviewEdit(row.full_path);
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
          const response = RankService.delete(row.id);
          fetchRanks();
          return response;
        } catch(e) {
          if(e instanceof RankServiceError){

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
    setSelectedRank((prevState) =>
      ({
        ...prevState,
        medal: file.item(0)
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
    setRank((prevState) =>
      ({
        ...prevState,
        medal: file.item(0)
      }));
  }

  const items = RankList.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>
          <img className="image-thumbnail" src={item.full_path}/>
        </td>
        <td>{item.min_score}</td>
        <td>{item.max_score}</td>
        <td>
          <Button color="warning" size="sm" onClick={() => getSelectedRank(item)}>Edit</Button>
          <Button color="danger" size="sm" className="ml-2" onClick={() => deleteSelected(item)}>Delete</Button>
        </td>
      </tr>
    )
  })

  const handleSubmitAdd = async () => {
    let formData = new FormData();
    if (Rank.medal.name) {
      formData.append('medal', Rank.medal);
    }
    formData.append('name', Rank.name);
    formData.append('min_score', Rank.min_score);
    formData.append('max_score', Rank.max_score);
    try {
      const response = await RankService.create(formData);
      toggleAdd();
      fetchRanks();
      if(response.error){
        setError(response.error);
      }
      return response;
    } catch(e) {
      if(e instanceof RankServiceError){

      }
    }
  };

  const handleSubmitEdit = async (id) => {
    let formData = new FormData();
    if (SelectedRank.medal.name) {
      formData.append('medal', SelectedRank.medal);
    }
    formData.append('name', SelectedRank.name);
    formData.append('min_score', SelectedRank.min_score);
    formData.append('max_score', SelectedRank.max_score);
    try {
      const response = await RankService.edit(id,formData);
      toggleEdit();
      fetchRanks();
      if(response.error){
        setError(response.error);
      }
      return response;
    } catch(e) {
      if(e instanceof RankServiceError){

      }
    }
  };

  useEffect(() => {
    fetchRanks();
  },[]);

  return (
    <div>
      <div className="mb-2">
        <Button color="primary" className="btn-pill" onClick={() => toggleAdd()}>
          <i className="fa fa-plus mr-1"></i>Add rank
        </Button>
      </div>
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Table responsive hover>
              <thead>
              <tr>
                <th>Name</th>
                <th>Medal</th>
                <th>Min Score</th>
                <th>Max Score</th>
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
          <ModalHeader toggle={toggleEdit}>Edit rank</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" placeholder="Enter category's name" defaultValue={SelectedRank.name} onChange={(e) => handleChangeEdit(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Min Score</Label>
                  <Input type="text" id="name" name="min_score" placeholder="Enter category's name" defaultValue={SelectedRank.min_score} onChange={(e) => handleChangeEdit(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Max Score</Label>
                  <Input type="text" id="name" name="max_score" placeholder="Enter category's name" defaultValue={SelectedRank.max_score} onChange={(e) => handleChangeEdit(e)} />
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">Rank Medal</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <div className="input-user-ava">
                      <Col xs="12" md="12">
                        { SelectedRank.medal !== '' && <img className="preview-ava" src={imgPreviewEdit}/>}
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
            <Button color="primary" onClick={() => handleSubmitEdit(SelectedRank.id)}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalAdd} toggle={toggleAdd}>
          <ModalHeader toggle={toggleAdd}>Add rank</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" placeholder="Enter category's name" onChange={(e) => handleChangeAdd(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Min Score</Label>
                  <Input type="text" id="name" name="min_score" placeholder="Enter category's name" onChange={(e) => handleChangeAdd(e)} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Max Score</Label>
                  <Input type="text" id="name" name="max_score" placeholder="Enter category's name" onChange={(e) => handleChangeAdd(e)} />
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">Rank Medal</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <div className="input-user-ava">
                      <Col xs="12" md="12">
                        { Rank.medal !== '' && <img className="preview-ava" src={imgPreviewAdd}/>}
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

export default Rank;
