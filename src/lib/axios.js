import Axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_WENDOR_API;

const axios = Axios.create({
    baseURL: BASE_URL,
});

axios.interceptors.response.use(
    (response) => {
        return response.data?.data;
    },
    (err) => {
        const message = err.response?.data?.message || 'Something went wrong';
        toast.error(message)
        return Promise.reject(err.response?.data || err);
    }
);

export default axios;
