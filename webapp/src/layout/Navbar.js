import React from "react";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";

const NavBar = ({ handleLogout }) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userName = userData ? userData.nama : "Guest";

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt="Logo"
                        src="favicon.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Brand>SKEMA WhatsApp Center</Navbar.Brand>
                <Nav className="ms-auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                            {userName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={handleLogout}>🚪 Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
