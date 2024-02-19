import axios from "axios";
import { Page } from '../Pages/Home';
import { API_KEY } from '../../env';

export const searchMovies = (query: string, page: number) => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
        .then((response) => response.data as Page)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

export const fetchMovies = (endpoint: string, page: number) => {
    return axios.get(`https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&page=${page}`)
        .then((response) => response.data as Page)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};
