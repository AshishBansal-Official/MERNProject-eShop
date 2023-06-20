import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
});

export default api;
