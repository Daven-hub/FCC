import axios from 'axios';

const url = '';
export const baseURL = url;

const api = axios.create({
    baseURL: baseURL,
});



export default api;
