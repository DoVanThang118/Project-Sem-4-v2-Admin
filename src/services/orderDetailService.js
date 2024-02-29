import axios from "axios";

const API_URL = "http://localhost:8080/api/orderDetails";
const headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    // 'Content-Type': 'multipart/form-data'
};

const orderDetailService = {

    getOrderDetails: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
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
