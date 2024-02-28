import { loginApi } from "../../services/auth.service";
import { toast } from "react-toastify";

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const USER_REFRESH = 'USER_REFRESH';
export const USER_LOGOUT = 'USER_LOGOUT';

export const handleLoginRedux = (username, password, rememberMe) => {
    return async (dispatch, getState) => {
        let res = await loginApi(username.trim(), password);
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('Role', res.data.role);
        localStorage.setItem('username', username.trim());
        localStorage.setItem('userId', res.data.id);

        // Lưu trạng thái "rememberMe" vào localStorage
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }

        dispatch({ type: FETCH_USER_LOGIN });
        console.log("Check api login:", res);
        if (res && res.data.token) {
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { username: username.trim(), Role: res.data.role, token: res.data.token }
            });
        } else {
            //error
            if (res && res.status === 401) {
                toast.error(res.data);
            }
            dispatch({
                type: FETCH_USER_ERROR,
            });
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        });
    }
}
export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        });
    }
}