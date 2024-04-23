import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL
})

export const setToken = (token) => {
  axiosInstance.defaults.headers.authorization = token
}

export const clearToken = () => {
  delete axiosInstance.defaults.headers.authorization
}

// creds => { email, password }
export const loginApi = async (email, password) => {
  return axiosInstance.post("/auth/login", { email, password })
}

// userData => { username, email, password }
export const signupApi = async (userData) => {
  return axiosInstance.post("/auth/signup", userData)
}

export const authCheckApi = async (token) => {
  return axiosInstance.get("/me")
}