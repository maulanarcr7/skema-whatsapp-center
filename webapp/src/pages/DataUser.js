import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Table, Modal } from "react-bootstrap";

const DataUser = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ nama: "", username: "", password: "" });
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: "", nama: "", username: "", password: "" });
    const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });

    // Fetch data users dari API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users"); // Ganti dengan URL API
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Handle form input change untuk tambah user
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle form input change untuk edit user
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle form input change untuk password
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle submit form untuk menambah user baru
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users", newUser); // Ganti dengan URL API
            setUsers((prevUsers) => [...prevUsers, response.data]); // Menambahkan user baru ke daftar
            setShowModal(false); // Tutup modal setelah berhasil
            setNewUser({ nama: "", username: "", password: "" }); // Reset form
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Handle submit form untuk mengedit user
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Password dan konfirmasi password tidak cocok.");
            return;
        }

        try {
            const updatedUser = { ...currentUser };
            if (passwordData.newPassword) {
                updatedUser.password = passwordData.newPassword;
            }

            const response = await axios.put(`http://localhost:5000/api/users/${currentUser.id}`, updatedUser); // Ganti dengan URL API
            setUsers((prevUsers) => prevUsers.map(user => user.id === currentUser.id ? response.data.user : user)); // Update user di daftar
            setShowEditModal(false); // Tutup modal setelah berhasil
            setPasswordData({ newPassword: "", confirmPassword: "" }); // Reset password form
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    // Handle show edit modal
    const handleEdit = (user) => {
        setCurrentUser(user);
        setShowEditModal(true);
    };

    return (
        <div>
            {/* <Button variant="primary" onClick={() => setShowModal(true)}>
                Tambah User
            </Button> */}

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.nama}</td>
                            <td>{user.username}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(user)}>Edit Profile</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal untuk tambah data user */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah User Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNama" className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama"
                                name="nama"
                                value={newUser.nama}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Username"
                                name="username"
                                value={newUser.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Masukkan Password"
                                name="password"
                                value={newUser.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal untuk edit data user */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group controlId="formNama" className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama"
                                name="nama"
                                value={currentUser.nama}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Username"
                                name="username"
                                value={currentUser.username}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNewPassword" className="mb-3">
                            <Form.Label>Password Baru</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Masukkan Password Baru (Opsional)"
                                name="newPassword"
                                minLength={6}
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Konfirmasi Password Baru</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Konfirmasi Password Baru"
                                name="confirmPassword"
                                minLength={6}
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DataUser;