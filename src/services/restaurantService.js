import axios from "axios";

const API_URL = "http://localhost:8080/api/restaurants";
const headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    'Content-Type': 'multipart/form-data'
};

const restaurantService = {

    getRestaurants: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findRestaurants: async (restaurant) => {
        try {
            const response = await axios.post(API_URL + "/list", restaurant, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRestaurant(restaurant) {
        return axios.post(API_URL + "/create", restaurant, {headers});
    },

    updateRestaurant(restaurant, restaurantId) {
        return axios.post(API_URL + "/" + restaurantId, restaurant, {headers});
    },

    deleteRestaurant(restaurantId) {
        return axios.delete(API_URL + "/" + restaurantId, {headers});
    }
}

export default restaurantService;