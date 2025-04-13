import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
    baseURL: 'https://books-register-api-production.up.railway.app/'
});

const { 'books-register.token': token } = parseCookies()

if (token) {
    fetch('https://books-register-api-production.up.railway.app/users', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    })
}

export default api