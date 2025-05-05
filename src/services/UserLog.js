import api from "../config/auth";

export const getUserLogs = async () => {
    const res = await api.get(`api/admin/user-logs/`);
    return res.data;

}