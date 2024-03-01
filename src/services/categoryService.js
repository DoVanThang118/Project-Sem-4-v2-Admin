import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";
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

const categoryService = {

    getCategories: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findCategories: async (category) => {
        try {
            const response = await axios.post(API_URL + "/list", category, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCategory(category) {
        return axios.post(API_URL + "/create", category, {headers});
    },

    updateCategory(category, categoryId) {
        return axios.post(API_URL + "/" + categoryId, category, {headers});
    },

    deleteCategory(categoryId) {
        return axios.delete(API_URL + "/" + categoryId, {headers});
    }
}

export default categoryService;
