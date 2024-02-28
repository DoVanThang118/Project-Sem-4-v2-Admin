  import axios from "axios";
const BASE_URL = "https://localhost:8080/api";
  const api = axios.create({
    baseURL:BASE_URL,
    // headers: {
    //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('state')).userlogin.jwt}`,
    //     'Content-Type': 'multipart/form-data'
    // }
});
export default api;