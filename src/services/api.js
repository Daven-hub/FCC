import axios from 'axios';

const url = 'http://formulaire.franchise-it-tech.com';
export const baseURL = url;

const api = axios.create({
    baseURL: baseURL,
});



export default api;
