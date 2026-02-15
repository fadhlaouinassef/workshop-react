import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/">Events Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "nav-link active-link" : "nav-link"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/events"
                            className={({ isActive }) =>
                                isActive ? "nav-link active-link" : "nav-link"
                            }
                        >
                            Events
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "nav-link active-link" : "nav-link"
                            }
                        >
                            About
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
