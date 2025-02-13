import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ganti dengan URL API kamu

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        });
        return response.data; // Asumsikan API mengembalikan { success: true, token: '...' }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
};


