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
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    'Content-Type': 'multipart/form-data',
};

const brandService = {

    getBrands: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findBrands: async (brand) => {
        try {
            const response = await axios.post(API_URL + "/list", brand, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createBrand(brand) {
        return axios.post(API_URL + "/create", brand, {headers});
    },

    updateBrand(brand, brandId) {

        return axios.put(API_URL + "/" + brandId, brand, {headers});
    },

    deleteBrand(brandId) {
        return axios.delete(API_URL + "/" + brandId, {headers});
    }
}

export default brandService;
