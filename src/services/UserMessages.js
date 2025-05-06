import api from "../config/auth";

export const getUserMessages = async () => {
    const res = await api.get(`api/notifications/admin/messages/`);
    return res.data;
}