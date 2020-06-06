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
import SeriesService, {SeriesServiceError} from "../../../services/series.service";
import swal from "sweetalert2";
import { useHistory } from "react-router-dom";


const ListSeries  = ({}) => {
  const [SeriesList, setSeriesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;
  const pagesCount = Math.ceil(SeriesList.length / pageSize);
  const history = useHistory();

  const fetchSeries = async () => {
    try {
      const response = await SeriesService.getList();
      setSeriesList(response.data);
      return response;
    } catch(e) {
      if(e instanceof SeriesServiceError){

      }
    }
  }

  const items = SeriesList.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    .map(item => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.author?.username}</td>
          <td>{item.category?.name}</td>
          <td>
            <Button color="warning" size="sm" onClick={() => history.push('/series/' + item.id)}>Edit</Button>
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
          const response = SeriesService.delete(row.id);
          fetchSeries();
          return response;
        } catch(e) {
          if(e instanceof SeriesServiceError){

          }
        }
      }
    })
  }


  useEffect(() => {
    fetchSeries();
  },[]);

  return (
    <div>
      <div className="mb-2">
        <Button color="primary" className="btn-pill" onClick={() => history.push('/series/add')}>
          <i className="fa fa-plus mr-1"></i>Add series
        </Button>
      </div>
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Table responsive hover>
              <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
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

export default ListSeries;
