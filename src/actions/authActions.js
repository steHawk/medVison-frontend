import axios from "axios";
import {
    AUTH_ERROR,
    GET_OTP,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
} from "./types";
import {createMessage, returnErrors} from "./messages";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    if (localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
        const number = localStorage.getItem("number");
        const body = {
            phoneNumber: number,
        };
        axios
            .post(`https://api.emetroplus.com/user/info`, body, tokenConfig(getState))
            .then((res) => {
                if (res.data.ok) {
                    localStorage.setItem("email", res.data.user_details.email);
                    localStorage.setItem("userName", res.data.user_details.userName);
                    localStorage.setItem("address", res.data.user_details.address);
                    localStorage.setItem("age", res.data.user_details.age);
                    localStorage.setItem("gender", res.data.user_details.gender);
                    dispatch({
                        type: USER_LOADED,
                        payload: res.data.user_details,
                    });
                } else {
                    dispatch({
                        type: AUTH_ERROR,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

// GET OTP BEFORE REGISTRATION
export const getOtp = (mobileNumber) => (dispatch) => {
    let mobile = mobileNumber.substr(-10);
    // const body = JSON.stringify({
    //   phoneNumber: mobileNumber,
    // });
    const body = {
        "signUp": true,
        "mobile": mobileNumber,
        "countryCode": "+91",
    }
    console.log(mobile);
    if (mobile === "" || mobile.length < 10) {
        dispatch(createMessage({number: "Incorrect mobile number"}));
    } else {
        axios
            .post(`https://api.emetroplus.com/message/mobile`, body)
            .then((res) => {
                console.log("getOtp res.data", res.data);

                if (res.data.message === "User already registered") {
                    dispatch(
                        createMessage({duplicate: "User already registered"})
                    );
                    window.location.href = "/login";
                } else {
                    dispatch({
                        type: GET_OTP,
                        payload: mobile,
                    });
                }
            })
            .catch((err) => {
                dispatch(returnErrors(err, err));
            });
    }
};

// PUSH OTP BEFORE REGISTRATION
export const validOtp = (mobile, otp) => (dispatch) => {
    if (mobile === "" || mobile.length < 10) {
        dispatch(createMessage({number: "Incorrect mobile number"}));
    } else if (otp === "" || otp.length < 6) {
        dispatch(createMessage({otp: "Invalid OTP"}));
    } else {
        let body = {
            otp: otp.toString(),
            mobile
        }
        axios.post('https://api.emetroplus.com/user/verifyotp', body)
            .then((response) => {
                console.log('====================================');
                console.log("verifyOtp response", response.data);
                console.log('====================================');
                if (response.data.status === true) {
                    window.location.href = "/register";
                } else {
                    dispatch(returnErrors(response.data.message, response.data.message))
                }
            }).catch((err) => {
            dispatch(returnErrors(err, err));
        })
    }
}

// REGISTER USER
export const register = ({number, userName, password, email}) => (dispatch) => {
    let mobile = number.substr(-10);

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
            "auth-type": "user",
        },
    };

    // Request Body
    const body = JSON.stringify({
        userDetails: {mobile: mobile, userName, email, password},
    });

    // Validate email
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function emailLength(email) {
        if (email.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    if (password.length === 0) {
        dispatch(createMessage({password: "Please set password"}));
    } else if (password.length < 8) {
        dispatch(
            createMessage({passwordL: "Password should be minimum 8 characters "})
        );
    } else if (emailLength(email) === true && validateEmail(email) === false) {
        dispatch(createMessage({email: "Enter a valid email"}));
    } else {
        axios
            .post("https://api.emetroplus.com/user/create", body, config)
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: res.data,
                    });
                    window.location.href = "/login"
                } else {
                    if (res.data.error.message) {
                        dispatch(returnErrors(res.data.error.message, res.data));
                    }
                    if (res.data.error.errmsg) {
                        dispatch(returnErrors(res.data.error.errmsg, res.data));
                    }
                    dispatch({
                        type: REGISTER_FAIL,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

// LOGIN USER
export const login = (number, password) => (dispatch, getState) => {
    let phoneNumber = number.substr(-10);
    const body = {mobile: phoneNumber, password: password};

    const headers = {
        "Content-Type": "application/json",
        "auth-type": "user",
    };

    if (number.length < 10 || number === "") {
        dispatch(createMessage({number: "Incorrect mobile number"}));
    } else if (password === "") {
        dispatch(createMessage({password: "Please enter your password"}));
    } else {
        axios
            .post(`https://api.emetroplus.com/auth/login`, body, {
                // .post(`http://localhost:3001/auth/login`, body, {
                headers: headers,
            })
            .then((res) => {
                // console.log("resssss", res.data);
                if (res.data.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data,
                        mobileNumber: number,
                    });
                    dispatch(createMessage({check: "Login Successfully"}));
                    loadUser();
                    window.location.reload();
                } else {
                    dispatch(
                        createMessage({check: "The username and password you entered did not match our records. Please double-check and try again."})
                    );
                    dispatch({
                        type: LOGIN_FAIL,
                    });
                }
            })
            .catch((err) => {
                dispatch(returnErrors(err.message, err.message));
            });
    }
};

// LOGOUT USER
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });
    dispatch(createMessage({check: "Logout Successfully"}));
};

// GET OTP FOR LOGIN
export const otpForLogin = (mobileNumber) => (dispatch) => {
    let mobile = mobileNumber.substr(-10);
    // const body = JSON.stringify({
    //   phoneNumber: mobileNumber,
    // });
    const body = {
        "login": true,
        mobile,
        "countryCode": "+91"
    };
    if (mobile === "" || mobile.length < 10) {
        dispatch(createMessage({number: "Incorrect mobile number"}));
    } else {
        axios
            .post(`https://api.emetroplus.com/message/mobile`, body)
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: GET_OTP,
                    payload: res.data.otp.otp,
                    mobileNumber: mobile,
                });
            })
            .catch((err) => {
                dispatch(returnErrors(err, err));
            });
    }
};

// PUSH OTP FOR LOGIN
export const afterOTPLogin = (mobile, otp) => (dispatch) => {
    if (mobile === "" || mobile.length < 10) {
        dispatch(createMessage({number: "Incorrect mobile number"}));
    } else if (otp === "" || otp.length < 6) {
        dispatch(createMessage({otp: "Invalid OTP"}));
    } else {
        let body = {
            otp: otp.toString(),
            mobile
        }
        axios.post('https://api.emetroplus.com/user/verifyotp', body)
            .then((response) => {
                console.log('====================================');
                console.log("verifyOtp response", response.data);
                console.log('====================================');
                if (response.data.status === true) {
                    console.log("----->", response.data)
                    // window.location.href = "/";
                } else {
                    dispatch(returnErrors(response.data.message, response.data.message))
                }
            }).catch((err) => {
            dispatch(returnErrors(err, err));
        })
    }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = localStorage.getItem("token");
    // console.log("toke",token);

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
        config.headers["auth-type"] = "user";
    }

    console.log(config);

    return config;
};