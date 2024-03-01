import axios from "axios";

const API_URL = "http://localhost:8080/api/orderDetails";
const headers = {
    'Content-Type': 'multipart/form-data',
};

const getAuthorizationHeader = () => {
    const storedState = localStorage.getItem('state');
    if (storedState) {
        const userlogin = JSON.parse(storedState).userlogin;
        if (userlogin && userlogin.jwt) {
            return {
                ...headers,
                'Authorization': `Bearer ${userlogin.jwt}`,
            };
        }
    }
    return headers;
};

const orderDetailService = {

    getOrderDetails: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findOrderDetails: async (orderDetail) => {
        try {
            const response = await axios.post(API_URL + "/list", orderDetail, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrderDetail(orderDetail) {
        return axios.post(API_URL + "/create", orderDetail, {headers});
    },

    updateOrderDetail(orderDetail, orderDetailId) {
        return axios.post(API_URL + "/" + orderDetailId, orderDetail, {headers});
    },

    deleteOrderDetail(orderDetailId) {
        return axios.delete(API_URL + "/" + orderDetailId, {headers});
    }
}

export default orderDetailService;
