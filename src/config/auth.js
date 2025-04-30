import axios from "axios";
import { API_URL } from "./apiConfig";


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