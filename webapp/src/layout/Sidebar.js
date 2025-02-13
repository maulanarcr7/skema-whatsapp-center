import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="d-flex flex-column p-3 bg-light vh-100" style={{ width: "250px" }}>
            <h4 className="text-center">Menu Utama</h4>
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/dashboard">📊 Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/data-user">👥 Data User</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/data-informasi">👥 Data Informasi</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/wa-bot-app">💬 WhatsApp Bot App</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;
