import axios from 'axios';
import router from '@/router';
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',

});

export default apiClient;