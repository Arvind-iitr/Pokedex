//for login signup etc

import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";
axios.defaults.withCredentials = true; //for storing cookies

const api = axios.create({
    baseURL: API_URL
})

//signup
export const signup = (username, email, password) => api.post("/signup", { username, email, password });

export const login = (email, password) => api.post("/login", { email, password });

export const sendOtp = () => api.post("/send-otp");