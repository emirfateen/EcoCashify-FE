import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export default apiClient;