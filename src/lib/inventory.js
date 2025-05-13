import axios from "./axios.js";

const BASE_URL = process.env.NEXT_PUBLIC_WENDOR_API;

export function getItems(page = 1, limit = 10) {
    return axios.get(`${BASE_URL}/inventories?page=${page}&limit=${limit}`);
}

export function getItemCount(params) {
    return axios.get(`${BASE_URL}/inventories/count`, params);
}

export function addToCart(payload) {
    return axios.post(`${BASE_URL}/cart`, payload);
}

export async function getCart() {
    const data = await axios.get(`${BASE_URL}/cart`, {
        params: {
            filter: {
                status: 'active',
            }
        }
    });
    return data[0];
}

export async function placeOrder(payload) {
    return axios.post(`${BASE_URL}/order`, payload);
}
