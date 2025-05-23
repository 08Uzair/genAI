import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8800/" });

export const signIn = (formData) => API.post("/user/login", formData)
export const signUp = (formData) => API.post("/user/signup", formData)
export const getUserById = (userId) => API.get(`/user/${userId}`)
export const createConv = (formData) => API.post(`/user/create-conv`, formData)
export const fetchUsersByRole = (role) => API.get(`/user/role/${role}`)
export const getMessagesByMessageId = (messageId) => API.get(`/messages/${messageId}`)