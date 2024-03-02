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

const API_URL = "http://localhost:8080/api/brands";
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

const brandService = {

    getBrands: async () => {
        try {
            const response = await axios.get(API_URL, { headers: getAuthorizationHeader() });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findBrands: async (brand) => {
        try {
            const response = await axios.post(API_URL + "/list", brand, {headers: getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createBrand(brand) {
        return axios.post(API_URL + "/create", brand, {headers: getAuthorizationHeader()});
    },

    updateBrand(brand, brandId) {

        return axios.put(API_URL + "/" + brandId, brand, {headers: getAuthorizationHeader()});
    },

    deleteBrand(brandId) {
        return axios.delete(API_URL + "/" + brandId, {headers: getAuthorizationHeader()});
    }
}

export default brandService;
