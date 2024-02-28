import axios from "axios";

const API_URL = "http://localhost:8080/";

// const register = (username, email, password) => {
//     return axios.post(API_URL + "register", {
//         username,
//         email,
//         password,
//     });
// };

const login = async (user) => {
    return axios
        .post(API_URL + "authenticate", {email:user.email,password:user.password})
        .then((response) => {
            if (response.data.username) {
                localStorage.setItem("token", JSON.stringify(response.data));
            }

            return response.data;
        });
};

// const logout = () => {
//     localStorage.removeItem("user");
//     return axios.post(API_URL + "signout").then((response) => {
//         return response.data;
//     });
// };
//
// const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem("user"));
// };

const AuthService = {
    // register,
    login,
    // logout,
    // getCurrentUser,
}

export default AuthService;