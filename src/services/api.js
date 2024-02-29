  import axios from "axios";
const BASE_URL = "https://localhost:8080";
  const api = axios.create({
    baseURL:BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export default api;