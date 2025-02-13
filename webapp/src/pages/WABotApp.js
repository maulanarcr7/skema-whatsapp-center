import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const WABotApp = () => {
    const [qrCode, setQrCode] = useState(null);
    const [status, setStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Berhasil terkoneksi ke Server Bot, Silahkan Menunggu QR Code");

    useEffect(() => {
        const socket = io("http://localhost:5000");

        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("qr-code", (qr) => {
            setQrCode(qr); // Set QR code ketika diterima dari server
        });

        socket.on("status", (isReady) => {
            setStatus(isReady);
            if (isReady) {
                setQrCode(null); // Hapus QR code ketika sudah terkoneksi
                setStatusMessage("Botchat WhatsApp Center sudah terkoneksi dan siap digunakan!");
            } else {
                setStatusMessage("Berhasil terkoneksi ke Server Bot, Silahkan Menunggu QR Code");
            }
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
            setStatusMessage("Server Bot WhatsApp terputus, silahkan periksa server bot Anda atau koneksi internet Anda!");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const getStatusStyle = () => {
        if (statusMessage === "Berhasil terkoneksi ke Server Bot, Silahkan Menunggu QR Code") {
            return { backgroundColor: "yellow", padding: "5px", borderRadius: "5px" };
        } else if (statusMessage === "Botchat WhatsApp Center sudah terkoneksi dan siap digunakan!") {
            return { backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px" };
        } else {
            return { backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px" };
        }
    };

    const handleLogoutAndRestart = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/logout');
            setQrCode(null); // Reset QR code
            setStatus(false); // Set status menjadi false
            setStatusMessage("Berhasil terkoneksi ke Server Bot, Silahkan Menunggu QR Code"); // Reset pesan status
            alert('Logout Sukses Silahkan Scan QR Code Baru Untuk Login Akun WhatsApp'); // Tampilkan pesan sukses
        } catch (error) {
            console.error('Error during logout:', error);
            // alert('Error during logout');
            alert('Logout Sukses Silahkan Scan QR Code Baru Untuk Login Akun WhatsApp'); // Tampilkan pesan sukses
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col>
                    <Card style={{ width: '24rem' }}>
                        <Card.Body>
                            <Card.Title className="text-center">SKEMA WhatsApp Center App</Card.Title>
                            <Card.Text className="text-center" style={getStatusStyle()}>
                                STATUS :<br></br><br></br> {statusMessage}
                            </Card.Text>
                            {!status && qrCode && ( // Tampilkan QR code hanya jika status tidak ready
                                <div className="text-center">
                                    <h3>Scan QR Code berikut dengan WhatsApp Anda:</h3>
                                    <img src={qrCode} alt="QR Code" style={{ width: '75%' }} />
                                </div>
                            )}
                            <div className="text-center mt-3">
                                {!statusMessage === "Berhasil terkoneksi ke Server Bot, Silahkan Menunggu QR Code" && (
                                    <Button variant="primary" disabled  onClick={handleLogoutAndRestart}>
                                        Ganti Akun WhatsApp
                                    </Button>
                                )}{statusMessage === "Botchat WhatsApp Center sudah terkoneksi dan siap digunakan!" && (
                                    <Button variant="danger" onClick={handleLogoutAndRestart}>
                                        Ganti Akun WhatsApp
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WABotApp;