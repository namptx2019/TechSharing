import React from 'react'
import { Link } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';

export default () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
    </Navbar>
)
