import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://weather.contrateumdev.com.br/api/weather?' //lat=-19.8218131&lon=-44.0094874
});