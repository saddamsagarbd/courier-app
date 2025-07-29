import axios from "axios";

const API = axios.create({ baseURL: process.env.API_ENDPOINT });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
