// import axios from "axios";

// const axiosInstance=axios.create({
//     baseURL:import.meta.env.VITE_API_URL,
//     headers:{
//         "Authorization":`Bearer ${localStorage.getItem('token')}`
//     }
// })

// export default axiosInstance


// import axios from 'axios';


// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         "Authorization": `Bearer ${localStorage.getItem('token')}`
//     }
// })


// export default axiosInstance; 


import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Always attach the latest token before sending a request
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default axiosInstance;
