// services/userService.js
import axios from 'axios'
import { API_URL } from '../config/apiConfig'
import api from '../config/auth'

export const getUser = async () => {
  const res = await api.get(`${API_URL}accounts/me/`)
  return res.data
}

export const updateUser = async (data) => {
  const res = await api.put(`${API_URL}accounts/me/`, data)
  return res 
}


export const deleteUser = async () => {
  const res = await axios.delete(`${API_URL}accounts/me/`)
  return res.data
}

export const adminUpdateUser = async (id,data) =>{
  const res = await api.patch(`${API_URL}accounts/admin/${id}/update/`, data)
  return res.data
}

export const createAdminNormalUser = async (data) => {
  const res = await api.post(`${API_URL}accounts/admin/register/user/`, data);
  return res.data;
};
