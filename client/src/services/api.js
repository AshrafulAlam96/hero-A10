import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export const getPartners = (params = {}) => api.get('/partners', { params })
export const getPartner = (id) => api.get(`/partners/${id}`)
export const createPartner = (data) => api.post('/partners', data)
export const sendRequest = (data) => api.post('/requests', data)
export const getRequestsByEmail = (email) => api.get('/requests', { params: { email } })
export const deleteRequest = (id) => api.delete(`/requests/${id}`)
