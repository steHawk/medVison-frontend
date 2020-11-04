import {
  FETCH_ALL_DOCTORS,
  CALLBACK_TOKEN,
  CALLBACK_TOKEN_NULL,
} from "./types"; //, DOCTOR_CONSULT
import axios from "axios";
import { createMessage } from "./messages";//, returnErrors

// GET ALL THE DOCTORS AND DISPLAY

export const fetchAllDoctors = () => (dispatch) => {
  fetch("https://api.emetroplus.com/doctor/data")
    .then((res) => res.json())
    .then((docs) =>
      dispatch({
        type: FETCH_ALL_DOCTORS,
        payload: docs.doctor_details,
      })
    );
};

// REQUEST FOR THE CALLBACK

export const callbackRequest = ({ userName, mobile, medicalComplaint }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    bookingDetails: { userName, mobile, medicalComplaint },
  };

  console.log(body);

  if (mobile === "" || mobile.length < 10) {
    dispatch(createMessage({ number: "Incorrect mobile number" }));
  } else if (userName === "") {
    dispatch(createMessage({ userName: "User Name empty" }));
  } else {
    axios
      .post("https://api.emetroplus.com/consultantbooking/create", body, config)
      .then((res) => {
        console.log("--->",res);
        dispatch({
          type: CALLBACK_TOKEN,
          payload: res.data,
        });
      });

    setTimeout(function () {
      dispatch({
        type: CALLBACK_TOKEN_NULL,
      });
    }, 3000);
  }
};

// DOCTOR CONSULTATION

export const doctorConsultation = ({ doctor_id }) => (dispatch, getState) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    bookingDetails: {
      userName: getState().auth.user.userName,
      mobile: getState().auth.user.mobile,
      user: getState().auth.user._id,
      doctor: doctor_id,
    },
  };

  // console.log(body);

  axios
    .post("https://api.emetroplus.com//consultantbooking/create", body, config)
    .then((res) => {
      // console.log("***",res.data);
      dispatch({
        type: CALLBACK_TOKEN,
        payload: res.data,
      });
    });

};

export const resetConsultToken = () =>(dispatch, getState)=>{
  // setTimeout(function () {
    dispatch({
      type: CALLBACK_TOKEN_NULL,
    });
  // }, 3000);
}