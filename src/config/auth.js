import axios from "axios";

const API_URL = "http://localhost:8000/";

const api = () => {
    const instance = axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,

        },
    });
    return instance
}

export default api;