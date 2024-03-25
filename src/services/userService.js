import axios from "axios";

const API_URL = "http://localhost:8080";
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

const userService = {

    getUsers: async () => {
        try {
            const response = await axios.get(API_URL + "/api/users", {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findUsers: async (user) => {
        try {
            const headers = getAuthorizationHeader();
            delete headers['Content-Type'];
            const response = await axios.post(API_URL + "/api/users/list", user, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createUser(user) {
        return axios.post(API_URL + "/register", user);
    },



    updateUser(user, userId) {
        return axios.put(API_URL + "/api/users/" + userId, user, {headers:getAuthorizationHeader()});
    },

    deleteUser(userId) {
        return axios.delete(API_URL + "/api/users/" + userId, {headers:getAuthorizationHeader()});
    }
}

export default userService;