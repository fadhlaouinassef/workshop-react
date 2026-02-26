import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function NavigationBar() {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/">Events Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
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
                        <Button
                            variant="success"
                            size="sm"
                            className="ms-3"
                            onClick={() => navigate('/events/add')}
                        >
                            ➕ Add New Event
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
