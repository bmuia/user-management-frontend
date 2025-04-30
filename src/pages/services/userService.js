import axios from 'axios';
import { API_URL } from '../config/apiConfig';

const API_BASE = `${API_URL}api/users/profile`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access')}`,
  },
});

export const getUser = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}/`, authHeader());
  return res.data;
};

export const updateUser = async (id, payload) => {
  const res = await axios.put(`${API_BASE}/${id}/`, payload, authHeader());
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}/`, authHeader());
  return res.data;
};
