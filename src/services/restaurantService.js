import axios from "axios";

const API_URL = "http://localhost:8080/api/admin/restaurants";
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

const restaurantService = {

    getRestaurants: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findRestaurants: async (restaurant) => {
        try {
            const headers = getAuthorizationHeader();
            delete headers['Content-Type'];
            const response = await axios.post(API_URL + "/list", restaurant, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRestaurant(restaurant) {
        return axios.post(API_URL + "/create", restaurant, {headers:getAuthorizationHeader()});
    },

    updateRestaurant(restaurant, restaurantId) {
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        return axios.put(API_URL + "/" + restaurantId, restaurant, {headers});
    },

    updateAvatar(file, restaurantId) {
        return axios.put(API_URL + "/avatar/" + restaurantId, file, { headers: getAuthorizationHeader() });
    },

    deleteRestaurant(restaurantId) {
        return axios.delete(API_URL + "/" + restaurantId, {headers:getAuthorizationHeader()});
    }
}

export default restaurantService;