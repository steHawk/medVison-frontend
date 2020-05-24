import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  GET_OTP,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "./types";
import { createMessage, returnErrors } from "./messages";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  const number = getState().auth.loginNumber;
  axios
    .get(
      `http://medlifeapi-env.eba-3pdzjp57.us-east-2.elasticbeanstalk.com/user/info?phoneNumber=${number}`,
      tokenConfig(getState)
    )
    .then((res) => {
      if (res.data.ok) {
        console.log(res);
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
      console.log("error");
    });
};

// GET OTP
export const getOtp = (mobileNumber) => (dispatch) => {
  let mobile = mobileNumber.substr(-10);
  console.log(mobile);
  if (mobile === "" || mobile.length < 10) {
    dispatch(createMessage({ number: "Incorrect mobile number" }));
  } else {
    axios
      .get(
        `http://medlifeapi-env.eba-3pdzjp57.us-east-2.elasticbeanstalk.com/user/sendotp?phoneNumber=${mobile}`
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.message === "Phone number already registered") {
          dispatch(
            createMessage({ duplicate: "Phone number already registered" })
          );
        } else {
          dispatch({
            type: GET_OTP,
            payload: res.data.otp,
            mobileNumber: mobile,
          });
        }
      })
      .catch((err) => {
        dispatch(returnErrors(err, err));
      });
  }
};

// LOGIN USER
export const login = (number, password) => (dispatch, getState) => {
  // Headers
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };

  // Request Body
  // const body = JSON.stringify({ username, password });

  if (number.length < 10 || number === "") {
    dispatch(createMessage({ number: "Incorrect mobile number" }));
  } else if (password === "") {
    dispatch(createMessage({ password: "Please enter your password" }));
  } else {
    axios
      .get(
        `http://medlifeapi-env.eba-3pdzjp57.us-east-2.elasticbeanstalk.com/user/login?phoneNumber=${number}&password=${password}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            number: number,
          });
        } else {
          dispatch(createMessage({ check: "Mobile Number or Password Incorrect" }));
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


// REGISTER USER
export const register = ({ number, userName, password, email }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({
    userDetails: { mobile: number, userName, email, password },
  });
  console.log(body);

  // Validate email
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function emailLength(email) {
  if(email.length > 0){
    return true
  }else{
    return false
  }
}

  if (password.length === 0) {
    dispatch(createMessage({ password: "Please set password" }));
  } else if (password.length < 8) {
    dispatch(
      createMessage({ passwordL: "Password should be minimum 8 characters " })
    );
  } else if (emailLength(email) === true) {
    console.log(email)
    if (validateEmail(email) === false)
      dispatch(createMessage({ email: "Enter a valid email" }));
  } else {
    axios
      .post(
        "http://medlifeapi-env.eba-3pdzjp57.us-east-2.elasticbeanstalk.com/user/create",
        body,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
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

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// Invalid OTP
export const validOtp = () => (dispatch) => {
  dispatch(createMessage({ otp: "Invalid OTP" }));
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["access-token"] = token;
  }

  console.log(config);

  return config;
};
