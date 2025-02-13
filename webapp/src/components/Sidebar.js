import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <div className="d-flex flex-column" style={{ width: '250px', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="p-3">
        <h3>Menu</h3>
      </div>
      <Nav className="flex-column p-3">
        {/* Menu Dashboard */}
        <Nav.Item>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </Nav.Item>
        {/* Menu Data User */}
        <Nav.Item>
          <Link to="/data-user" className="nav-link">
            Data User
          </Link>
        </Nav.Item>
        {/* Menu Data Informasi */}
        <Nav.Item>
          <Link to="/data-informasi" className="nav-link">
            Data Informasi
          </Link>
        </Nav.Item>
        {/* Menu WA Bot App */}
        <Nav.Item>
          <Link to="/wa-bot-app" className="nav-link">
            WhatsApp Bot App
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
