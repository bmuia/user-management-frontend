// services/userService.js
import axios from 'axios'
import { API_URL } from '../config/apiConfig'
import api from '../config/auth'

export const getUser = async () => {
  const res = await api.get(`${API_URL}api/users/me/`)
  return res.data
}

export const updateUser = async () => {
  const res = await axios.put(`${API_URL}api/users/me/`)
  return res.data
}

export const deleteUser = async () => {
  const res = await axios.delete(`${API_URL}api/users/me/`)
  return res.data
}
