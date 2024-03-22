import api from "./api";
import Swal from "sweetalert2";
const Alert = () => {
    Swal.fire(
        'Success!',
        'You clicked the button!',
        'success'
    )
}
const AlertFail = () => {
    Swal.fire(
        'Failed!',
        'Something went wrong!',
        'error'
    )
}
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

export const auth_login = async (user) => {
    const url = "/authenticate";
    try {
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        const rs = await api.post(url, { email: user.email, password: user.password, headers});
        // const token = rs.data.token;
        //   alert("Đăng nhập thành công");
        console.log("check rs:", rs);
        Alert();

        return rs.data;
    } catch (error) {
        AlertFail();
        return null;
    }

}

export const auth_profile = async () => {
    const url = "authenticate";
    try {
        const rs = await api.get(url);
        // const token = rs.data.token;
        return rs.data;
    } catch (error) {
        alert("Tài khoản hoặc mật khẩu không đúng");
        return null;
    }
}