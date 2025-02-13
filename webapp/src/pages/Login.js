import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) navigate('/dashboard');
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!username || !password) {
            setErrorMessage('Username dan Password wajib diisi!');
            return;
        }
        const response = await loginUser(username, password);
        console.log(response.data);
        
        if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.user); // Update state
            navigate('/dashboard');
        } else {
            setErrorMessage(response.message || 'Akun tidak ditemukan');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <h4 className="text-center mb-4">Login</h4>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
