import {
    GET_OTP,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING,
} from "../actions/types";

const initialState = {
    otp: "",
    number: "",
    loginNumber: localStorage.getItem("number"),
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    isLoading: false,
    user: "",
    gotOtp: null,
    _id: localStorage.getItem("_id"),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                // _id: action.payload._id,
            };
        case GET_OTP:
            // localStorage.setItem("otpmobile", action.payload)
            return {
                ...state,
                number: action.payload,
                gotOtp: true,
            };
        // case GET_OTP_LOGIN:
        //   localStorage.setItem("token", action.token);
        //   localStorage.setItem("_id", action.user_id);
        //   localStorage.setItem("number", action.mobileNumber);
        //   return {
        //     ...state,
        //     otp: action.payload,
        //     number: action.mobileNumber,
        //     gotOtp: true,
        //   };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("number", action.mobileNumber);
            localStorage.setItem("_id", action.payload._id);
            localStorage.setItem('isAuthenticated', "true");
            return {
                ...state,
                ...action.payload,
                isAuthenticated: "true",
                isLoading: false,
            };
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.clear()
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                gotOtp: false,
            };
        default:
            return state;
    }
}
