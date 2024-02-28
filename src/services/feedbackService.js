import axios from "axios";

const API_URL = "http://localhost:8080/api/feedbacks";
const headers = {
    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    'Content-Type': 'multipart/form-data'
};

const feedbackService = {

    getFeedbacks: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findFeedbacks: async (feedback) => {
        try {
            const response = await axios.post(API_URL + "/list", feedback, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createFeedback(feedback) {
        return axios.post(API_URL + "/create", feedback, {headers});
    },

    updateFeedback(feedback, feedbackId) {
        return axios.post(API_URL + "/" + feedbackId, feedback, {headers});
    },

    deleteFeedback(feedbackId) {
        return axios.delete(API_URL + "/" + feedbackId, {headers});
    }
}

export default feedbackService;
