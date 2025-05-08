import api from "../config/auth";

export const getUserMessages = async () => {
    const res = await api.get(`api/notifications/admin/messages/`);
    return res.data;
}

export const sendReplyToMessage = async (messageId, reply) => {
    const res = await api.post(`api/notifications/admin/messages/${messageId}/reply/`, { reply });
    return res.data;
}

export const fetchNotifications = async () => {
    const res  = await api.get(`api/notifications/messages/`);
    return res.data;
}