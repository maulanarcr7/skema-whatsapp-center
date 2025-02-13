import React, {useEffect} from "react";
import Sidebar from "./Sidebar";
import NavBar from "./Navbar"; // Import Navbar
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom"; // Untuk render halaman anak

const Layout = ({ handleLogout }) => {
    useEffect(() => {
        document.title = "SKEMA WhatsApp Center"; // Ganti dengan judul yang Anda inginkan
    }, []);
    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <Sidebar />
            <div style={{ flexGrow: 1 }}>
                {/* Navbar */}
                <NavBar handleLogout={handleLogout} />
                <Container className="mt-4">
                    {/* Render halaman yang sedang dipilih */}
                    <Outlet />
                </Container>
            </div>
        </div>
    );
};

export default Layout;
