import axios from "axios";
import {toast} from "react-toastify";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use((response) => response, (error) => {
    if (error) {
        toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    return Promise.reject(error)
});
export default axiosClient;