import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Table, Modal, Pagination } from "react-bootstrap";

const DataInformasi = () => {
    const [informasi, setInformasi] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState("asc");
    const [newInfo, setNewInfo] = useState({ menu: "", data: "", image: "" });
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentInfo, setCurrentInfo] = useState({ id: "", menu: "", data: "", image: "" });
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch data informasi dari API
    useEffect(() => {
        const fetchInformasi = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/messages"); // Ganti dengan URL API
                setInformasi(response.data);
            } catch (error) {
                console.error("Error fetching informasi:", error);
            }
        };

        fetchInformasi();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Handle image change (preview)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewInfo((prevInfo) => ({
            ...prevInfo,
            image: file,
        }));
        setImagePreview(URL.createObjectURL(file)); // Preview image
    };

    // Handle submit form untuk menambah informasi baru
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("menu", newInfo.menu);
        formData.append("data", newInfo.data);
        formData.append("image", newInfo.image);

        try {
            const response = await axios.post("http://localhost:5000/api/messages", formData, { // Ganti dengan URL API
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setInformasi((prevInfo) => [...prevInfo, response.data]); // Menambahkan informasi baru ke daftar
            setShowModal(false); // Tutup modal setelah berhasil
            setImagePreview(null); // Reset preview image
            setNewInfo({ menu: "", data: "", image: "" }); // Reset form
        } catch (error) {
            console.log("Error adding informasi:", error.response.data);
        }
    };

    // Handle delete informasi
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus informasi ini?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/messages/${id}`);
                setInformasi((prevInfo) => prevInfo.filter(info => info.id !== id)); // Hapus informasi dari daftar
            } catch (error) {
                console.error("Error deleting informasi:", error);
            }
        }
    };

    // Handle edit informasi
    const handleEdit = (info) => {
        setCurrentInfo(info);
        setImagePreview(`http://localhost:5000/uploads/${info.image}`); // Set image preview saat modal edit dibuka
        setShowEditModal(true);
    };

    // Handle submit form untuk mengedit informasi
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("menu", currentInfo.menu);
        formData.append("data", currentInfo.data);
        if (currentInfo.image instanceof File) {
            formData.append("image", currentInfo.image);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/messages/${currentInfo.id}`, formData, { // Ganti dengan URL API
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setInformasi((prevInfo) => prevInfo.map(info => info.id === currentInfo.id ? response.data : info)); // Update informasi di daftar
            setShowEditModal(false); // Tutup modal setelah berhasil
            setImagePreview(null); // Reset preview image
            setCurrentInfo({ id: "", menu: "", data: "", image: "" }); // Reset form
        } catch (error) {
            console.error("Error editing informasi:", error);
        }
    };

    // Handle form input change untuk edit
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Handle image change (preview) untuk edit
    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        setCurrentInfo((prevInfo) => ({
            ...prevInfo,
            image: file,
        }));
        setImagePreview(URL.createObjectURL(file)); // Preview image
    };

    // Handle show details
    const handleShowDetails = (info) => {
        setCurrentInfo(info);
        setShowDetailsModal(true);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle sort change
    const handleSortChange = () => {
        const sortedData = [...informasi].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.menu.localeCompare(b.menu);
            } else {
                return b.menu.localeCompare(a.menu);
            }
        });
        setInformasi(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = informasi.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(informasi.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Tambah Informasi
            </Button>
            <div className="d-flex justify-content-between mt-3"> 
                <Button variant="secondary" className="ml-2" onClick={handleSortChange}>
                    Sort by Menu ({sortOrder === "asc" ? "Asc" : "Desc"})
                </Button> 
                    {/* Pagination */}
                <Pagination>
                    {pageNumbers.map(number => (
                        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Menu</th>
                        <th>Data</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((info, index) => (
                        <tr key={info.id || index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{info.menu}</td>
                            <td>{typeof info.data === 'string' ? `${info.data.substring(0, 100)}...` : ''}</td>
                            <td>
                                {info.image && (
                                    <img
                                        src={`http://localhost:5000/uploads/${info.image}`} // Ganti dengan URL API yang sesuai
                                        alt="Informasi"
                                        width="100"
                                    />
                                )}
                            </td>
                            <td>
                                <Button variant="info" onClick={() => handleShowDetails(info)}>Details</Button>
                                <Button variant="warning" onClick={() => handleEdit(info)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(info.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between mt-3"> 
                <Button variant="secondary" className="ml-2" onClick={handleSortChange}>
                    Sort by Menu ({sortOrder === "asc" ? "Asc" : "Desc"})
                </Button> 
                    {/* Pagination */}
                <Pagination>
                    {pageNumbers.map(number => (
                        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>

            {/* Modal untuk tambah data informasi */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Informasi Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formMenu" className="mb-3">
                            <Form.Label>Menu</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Menu"
                                name="menu"
                                value={newInfo.menu}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formData" className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Masukkan Informasi"
                                name="data"
                                value={newInfo.data}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formImage" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img src={imagePreview} alt="Image Preview" width="250" />
                                </div>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal untuk edit data informasi */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Informasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group controlId="formEditMenu" className="mb-3">
                            <Form.Label>Menu</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Menu"
                                name="menu"
                                value={currentInfo.menu}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEditData" className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                placeholder="Masukkan Informasi"
                                name="data"
                                value={currentInfo.data}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEditImage" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleEditImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img src={imagePreview} alt="Image Preview" width="250" />
                                </div>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal untuk menampilkan detail informasi */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Informasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDetailMenu" className="mb-3">
                            <Form.Label>Menu</Form.Label>
                            <Form.Control
                                type="text"
                                name="menu"
                                value={currentInfo.menu}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group controlId="formDetailData" className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                name="data"
                                value={currentInfo.data}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group controlId="formDetailImage" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            {currentInfo.image && (
                                <img src={`http://localhost:5000/uploads/${currentInfo.image}`} alt="Image" width="250" />
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DataInformasi;