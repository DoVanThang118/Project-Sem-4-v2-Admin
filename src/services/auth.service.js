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


export const auth_login = async (user) => {
    const url = "/authenticate";
    try {
        const rs = await api.post(url, { email: user.email, password: user.password });
        // const token = rs.data.token;
        //   alert("Đăng nhập thành công");
        console.log("check rs:", rs)

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