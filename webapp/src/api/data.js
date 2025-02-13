import axios from 'axios';

// Fungsi untuk mengambil data
export const getData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};
