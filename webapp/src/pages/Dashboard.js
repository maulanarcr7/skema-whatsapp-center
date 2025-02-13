import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = ({ setUser }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); // Ambil user dari localStorage
    // console.log(user);
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login", { replace: true });
    };

    return (
    <Container className="mt-4">
                    <h2>Welcome, {user.nama}!</h2>
                    <p>Ini adalah halaman Dashboard.</p>
                </Container>
    );
};

export default Dashboard;
