import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1/",
});

export const baseURL = "https://eshop-8646.onrender.com/api/v1/";

export default api;
