import axios from "axios";

const API_URL = "http://localhost:8080/api/users";
const headers = {
    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    'Content-Type': 'multipart/form-data'
};

const userService = {

    getUsers: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findUsers: async (user) => {
        try {
            const response = await axios.post(API_URL + "/list", user, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createUser(user) {
        return axios.post(API_URL + "/create", user, {headers});
    },

    updateUser(user, userId) {
        return axios.post(API_URL + "/" + userId, user, {headers});
    },

    deleteUser(userId) {
        return axios.delete(API_URL + "/" + userId, {headers});
    }
}

export default userService;
