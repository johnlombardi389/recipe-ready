import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://john389.pythonanywhere.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// http://localhost:8000/api/

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
