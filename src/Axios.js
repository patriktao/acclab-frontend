import Axios from 'axios';

export const axios = Axios.create({
    baseURL: "http://10.0.0.2:4000/", 
});