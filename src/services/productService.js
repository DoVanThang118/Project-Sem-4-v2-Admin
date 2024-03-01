import axios from "axios";

const API_URL = "http://localhost:8080/api/products";
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

const productService = {

    getProducts: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findProducts: async (product) => {
        try {
            const response = await axios.post(API_URL + "/list", product, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createProduct(product) {
        return axios.post(API_URL + "/create", product, {headers});
    },

    updateProduct(product, productId) {
        return axios.post(API_URL + "/" + productId, product, {headers});
    },

    deleteProduct(productId) {
        return axios.delete(API_URL + "/" + productId, {headers});
    }
}

export default productService;
