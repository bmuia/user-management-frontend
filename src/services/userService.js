import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import api from '../config/auth';

const API_BASE = `${API_URL}api/users/profile`;



export const getUser = async (id) => {
  const res = await api.get(`${API_BASE}/${id}/`);
  return res.data;
};

export const updateUser = async (id, payload) => {
  const res = await api.put(`${API_BASE}/${id}/`, payload);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`${API_BASE}/${id}/`);
  return res.data;
};
