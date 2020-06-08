import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import UserService, {UserServiceError} from "../../../services/user.service";
import swal from "sweetalert2";
import { useHistory } from "react-router-dom";


const ListUsers  = ({}) => {
  const [UsersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;
  const pagesCount = Math.ceil(UsersList.length / pageSize);
  const history = useHistory();

  const fetchUsers = async () => {
    try {
      const response = await UserService.getList();
      setUsersList(response.data);
      return response;
    } catch(e) {
      if(e instanceof UserServiceError){

      }
    }
  }

  const items = UsersList.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    .map(item => {
      return (
        <tr key={item.id}>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.role.text}</td>
          <td>{item.score}</td>
          <td>{item.rank.name}</td>
          <td>
            <Button color="warning" size="sm" onClick={() => history.push('/users/' + item.uuid)}>Edit</Button>
            <Button color="danger" size="sm" className="ml-2" onClick={() => deleteSelected(item)}>Delete</Button>
          </td>
        </tr>
      )
    })

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
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
    }).then ((result) => {
      if (result.value) {
        try {
          const response = UserService.delete(row.id);
          fetchUsers();
          return response;
        } catch(e) {
          if(e instanceof UserServiceError){

          }
        }
      }
    })
  }


  useEffect(() => {
    fetchUsers();
  },[]);

  return (
    <div>
      <div className="mb-2">
        <Button color="primary" className="btn-pill" onClick={() => history.push('/users/add')}>
          <i className="fa fa-plus mr-1"></i>Add user
        </Button>
      </div>
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Table responsive hover>
              <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Score</th>
                <th>Rank</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {items}
              </tbody>
            </Table>
            <Pagination>
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={e => handlePageClick(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>
              {[...Array(pagesCount)].map((page, i) =>
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink
                  onClick={e => handlePageClick(e, currentPage + 1)}
                  next
                  href="#"
                />
              </PaginationItem>
            </Pagination>
          </Card>
        </Col>
      </Row>
    </div>

  );

}

export default ListUsers;
