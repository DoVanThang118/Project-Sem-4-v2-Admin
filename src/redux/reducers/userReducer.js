// Trước khi viết thì npm Redux Thunk npm i redux-thunk
import { FETCH_USER_LOGIN, FETCH_USER_ERROR, FETCH_USER_SUCCESS, USER_LOGOUT, USER_REFRESH } from "../actions/userAction";

const INITIAL_STATE = {

    account:
    {
        username: '',
        auth: null,
        token: '',
        Role: ''
    },
    isLoading: false,
    isError: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                account: {
                    auth: false
                },
                isLoading: false,
                isError: true
            };
        case FETCH_USER_SUCCESS:
            console.log("Check action: ", action);
            return {
                ...state,
                account: {
                    username: action.data.username,
                    token: action.data.token,
                    Role: action.data.Role,
                    auth: true
                },
                isLoading: false,
                isError: false
            };
        case USER_LOGOUT:
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('Role');
            return {
                ...state,
                account: {
                    username: '',
                    Role: '',
                    token: '',
                    auth: false
                }
            };
        case USER_REFRESH:
            return {
                ...state,
                account: {
                    username: localStorage.getItem('username'),
                    Role: localStorage.getItem('Role'),
                    token: localStorage.getItem('token'),
                    auth: true
                }
            };
        default:
            return state;
    }
};

export default userReducer;
