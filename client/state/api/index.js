import axios from "axios";
// http://localhost:8800/ai/chat
const API = axios.create({ baseURL: "http://localhost:8800" });

export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const getUserById = (userId) => API.get(`/user/${userId}`);
export const createConv = (formData) => API.post(`/user/create-conv`, formData);
export const fetchUsersByRole = (role) => API.get(`/user/role/${role}`);
export const getMessagesByMessageId = (messageId) =>
  API.get(`/messages/${messageId}`);

// Summary
export const getSummary = (id) => API.get(`/ai/summary/${id}`);
export const generateSummary = (data) => API.post(`/ai/summary`, data);

// AI Chat
export const generateAIChat = (data) => API.post(`/ai/chat`, data);
export const getAIChat = () => API.get(`/ai/chat`);

// Suggestion
export const getSuggestion = (id) => API.get(`/ai/suggestion/${id}`);
export const generateSuggestion = (data) => API.post(`/ai/suggestion`, data);

// Summarize PDF
export const summarizePdf = (formData) =>
  API.post(`/ai/summary/pdf`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
