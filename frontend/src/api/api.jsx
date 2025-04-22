//to get user data etc

import axios from "axios";

const API_URL = "http://localhost:3000/api/user";
axios.defaults.withCredentials = true; //for storing cookies

const api = axios.create({
    baseURL: API_URL
})

export const getUser = async () => {
    return api.get('/get-data');
}

export const updateProfile = async (data) => {
   return api.put('/update-profile', data);
}