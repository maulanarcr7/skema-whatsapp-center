import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataUser from "./pages/DataUser";
import DataInformasi from "./pages/DataInformasi";
import WABotApp from "./pages/WABotApp";
import Layout from "./layout/Layout"; // Import Layout

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);

    // Pastikan state sinkron dengan localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser !== user) {
            setUser(storedUser);
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate replace to="/dashboard" />} />
                
                {/* Layout yang digunakan untuk Dashboard dan Data User */}
                <Route path="/" element={user ? <Layout handleLogout={handleLogout} /> : <Navigate replace to="/login" />}>
                    <Route path="dashboard" element={user ? <Dashboard /> : <Navigate replace to="/login" />} />
                    <Route path="data-user" element={user ? <DataUser /> : <Navigate replace to="/login" />} />
                    <Route path="data-informasi" element={user ? <DataInformasi /> : <Navigate replace to="/login" />} />
                    <Route path="wa-bot-app" element={user ? <WABotApp /> : <Navigate replace to="/login" />} />
                </Route>

                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
