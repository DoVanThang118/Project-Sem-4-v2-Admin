import axios from "axios";
import Swal from "sweetalert2";

const Alert = () =>{
    Swal.fire(
        'Success!',
        'You clicked the button!',
        'success'
    )
}
const AlertFail = () =>{
    Swal.fire(
        'Failed!',
        'Something went wrong!',
        'error'
    )
}

const API_URL = "http://localhost:8080/api/orders";
const headers = {
    'Content-Type': 'multipart/form-data'
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

const orderService = {

    getOrders: async () => {
        try {
            const response = await axios.get(API_URL, { headers: getAuthorizationHeader() });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findOrders: async (order) => {
        try {
            const headers = getAuthorizationHeader();
            delete headers['Content-Type'];
            const response = await axios.post(API_URL + "/list", order, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrder(order) {
        return axios.post(API_URL + "/create", order, { headers: getAuthorizationHeader() });
    },

    updateOrder(order, orderId) {
        return axios.post(API_URL + "/" + orderId, order, { headers: getAuthorizationHeader() });
    },

    deleteOrder(orderId) {
        return axios.delete(API_URL + "/" + orderId, { headers: getAuthorizationHeader() });
    }
}

export default orderService;
