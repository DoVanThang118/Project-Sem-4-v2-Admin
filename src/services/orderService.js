import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";
const headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    // 'Content-Type': 'multipart/form-data'
};

const orderService = {

    getOrders: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findOrders: async (order) => {
        try {
            const response = await axios.post(API_URL + "/list", order, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrder(order) {
        return axios.post(API_URL + "/create", order, {headers});
    },

    updateOrder(order, orderId) {
        return axios.post(API_URL + "/" + orderId, order, {headers});
    },

    deleteOrder(orderId) {
        return axios.delete(API_URL + "/" + orderId, {headers});
    }
}

export default orderService;
