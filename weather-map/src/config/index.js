import axios from 'axios';


export const http = axios.create({
    baseURL: `https://weather.contrateumdev.com.br/api/`
});