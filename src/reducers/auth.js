import {
  USER_LOADED,
  USER_LOADING,
  GET_OTP,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // GET_OTP_LOGIN,
} from "../actions/types";

const initialState = {
  otp: "",
  number: "",
  loginNumber: localStorage.getItem("number"),
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: null,
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
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
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
