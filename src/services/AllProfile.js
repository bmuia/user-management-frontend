import api from "../config/auth";
import { API_URL } from "../config/apiConfig";
export const getAllProfiles = async () => {
    try {
        const res = await api.get(`${API_URL}accounts/profiles/`);
        return res.data;
    } catch (error) {
        console.error("Error fetching all profiles:", error);
        throw error;
    }
    }   