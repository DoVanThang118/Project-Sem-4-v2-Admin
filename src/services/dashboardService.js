import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";
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

const dashboardService = {

    getNotify: async () => {
        try {
            const headers = getAuthorizationHeader();
            delete headers['Content-Type'];
            const response = await axios.get(API_URL + '/restaurants/total_revenue' , {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default dashboardService;