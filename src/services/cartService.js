import axios from "axios";

const API_URL = "http://localhost:8080/api/carts";
const headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    // 'Content-Type': 'multipart/form-data'
};

const cartService = {

    getCarts: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findCarts: async (cart) => {
        try {
            const response = await axios.post(API_URL + "/list", cart, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCart(cart) {
        return axios.post(API_URL + "/create", cart, {headers});
    },

    updateCart(cart, cartId) {
        return axios.post(API_URL + "/" + cartId, cart, {headers});
    },

    deleteCart(cartId) {
        return axios.delete(API_URL + "/" + cartId, {headers});
    }
}

export default cartService;
