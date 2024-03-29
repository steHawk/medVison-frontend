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
import instance from "../api/instance";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    if (localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
        const number = localStorage.getItem("number");
        const body = {
            phoneNumber: number,
        };

        instance.post('user/info', body)
            .then((res) => {
                if (res.data.ok) {
                    console.log("data===>", res.data)
                    localStorage.setItem("email", res.data.user_details.email ? res.data.user_details.email : "");
                    localStorage.setItem("userName", res.data.user_details.userName ? res.data.user_details.userName : "");
                    localStorage.setItem("address", res.data.user_details.address ? res.data.user_details.address : "");
                    localStorage.setItem("age", res.data.user_details.age ? res.data.user_details.age : "");
                    localStorage.setItem("gender", res.data.user_details.gender ? res.data.user_details.gender : "");
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
export const otpForRegister = (mobileNumber) => (dispatch) => {
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
        instance.post('message/mobile', body)
            .then((res) => {
                console.log("getOtp res.data", res.data);

                if (res.data.message === "User already registered") {
                    dispatch(createMessage({check: "User already registered"}));
                    setTimeout(() => {  window.location.href = "/login"; }, 2000);
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
export const afterOTPRegister = (mobile, otp) => (dispatch) => {
    if (mobile === "" || mobile.length < 10) {
        dispatch(createMessage({number: "Incorrect mobile number"}));
    } else if (otp === "" || otp.length < 6) {
        dispatch(createMessage({otp: "Invalid OTP"}));
    } else {
        let body = {
            otp: otp.toString(),
            mobile
        }
        console.log({body})
        instance.post('user/verifyotp', body)
            .then((response) => {
                console.log('====================================');
                console.log("verifyOtp response", response.data);
                console.log('====================================');
                if (response.data.status) {
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-type": "user",
                        },
                    };

                    // Request Body
                    const body = JSON.stringify({
                        userDetails: {mobile},
                    });

                    console.log({body})

                    instance.post('user/create', body)
                        .then((res) => {
                            console.log(res);
                            if (res.data.success) {
                                dispatch({
                                    type: REGISTER_SUCCESS,
                                    payload: res.data,
                                    mobileNumber: mobile,
                                });
                                loadUser();
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
                } else {
                    dispatch(returnErrors(response.data.message, response.data.message))
                }
            }).catch((err) => {
            dispatch(returnErrors(err, err));
        })
    }
}

// REGISTER USER
// export const register = ({number}) => (dispatch) => {
//     let mobile = number.substr(-10);
//
//     // Headers
//
// };

// LOGIN USER
// export const login = (number, password) => (dispatch, getState) => {
//     let phoneNumber = number.substr(-10);
//     const body = {mobile: phoneNumber, password: password};
//
//     const headers = {
//         "Content-Type": "application/json",
//         "auth-type": "user",
//     };
//
//     if (number.length < 10 || number === "") {
//         dispatch(createMessage({number: "Incorrect mobile number"}));
//     } else if (password === "") {
//         dispatch(createMessage({password: "Please enter your password"}));
//     } else {
//         axios
//             .post(`https://api.emetroplus.com/auth/login`, body, {
//                 // .post(`http://localhost:3001/auth/login`, body, {
//                 headers: headers,
//             })
//             .then((res) => {
//                 // console.log("resssss", res.data);
//                 if (res.data.success) {
//                     dispatch({
//                         type: LOGIN_SUCCESS,
//                         payload: res.data,
//                         mobileNumber: number,
//                     });
//                     dispatch(createMessage({check: "Login Successfully"}));
//                     loadUser();
//                     window.location.reload();
//                 } else {
//                     dispatch(
//                         createMessage({check: "The username and password you entered did not match our records. Please double-check and try again."})
//                     );
//                     dispatch({
//                         type: LOGIN_FAIL,
//                     });
//                 }
//             })
//             .catch((err) => {
//                 dispatch(returnErrors(err.message, err.message));
//             });
//     }
// };

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
    console.log({body})
    if (mobile === "" || mobile.length < 10) {
        dispatch(createMessage({number: "Incorrect mobile number"}));
    } else {
        instance.post('message/mobile', body)
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
        let body = JSON.stringify({
            otp: otp.toString(),
            mobile
        });
        let headers = {
            'auth-type': 'user',
            'login-type': 'mobileOtp',
            'Content-Type': 'application/json',
        };
        fetch('https://api.emetroplus.com/auth/login', {
            method: 'POST',
            headers,
            body
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data,
                    mobileNumber: mobile,
                });
                dispatch(createMessage({check: "Login Successfully"}));
                loadUser();
                window.location.reload();
            } else {
                dispatch(createMessage({check: "Login Failed"}));
            }
            console.log("data", data);
        }).catch(err => {
            dispatch(returnErrors(err, err))
            console.log("err", err);
        })
        // axios.post('https://api.emetroplus.com/auth/login', headers, body)
        //     .then((response) => {
        //         console.log('====================================');
        //         console.log("verifyOtp response", response.data);
        //         console.log('====================================');
        //         if (response.data.status === true) {
        //             console.log("----->", response.data)
        //             // window.location.href = "/";
        //         } else {
        //             dispatch(returnErrors(response.data.message, response.data.message))
        //         }
        //     }).catch((err) => {
        //     console.log("errrr", err)
        //     dispatch(returnErrors(err, err));
        // })
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