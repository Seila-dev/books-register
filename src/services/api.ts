import axios from 'axios';

const api = axios.create({
    baseURL: 'https://books-register-api.onrender.com'
});

export default api