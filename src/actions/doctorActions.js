import {
  FETCH_ALL_DOCTORS,
  CALLBACK_TOKEN,
  CALLBACK_TOKEN_NULL,
} from "./types"; //, DOCTOR_CONSULT
import { createMessage } from "./messages";
import instance from "../api/instance";
import baseURL from "../api/baseURL";
//, returnErrors

// GET ALL THE DOCTORS AND DISPLAY

export const fetchAllDoctors = () => (dispatch) => {
  fetch(`${baseURL}doctor/data`)
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

    instance.post('consultantbooking/create', body)
        .then((res) => {
          console.log("--->",res);
          dispatch({
            type: CALLBACK_TOKEN,
            payload: res.data,
          });
        }).catch(error=>{
      console.log({error})
    });


    setTimeout(function () {
      dispatch({
        type: CALLBACK_TOKEN_NULL,
      });
    }, 3000);
  }
};

// DOCTOR CONSULTATION

export const doctorConsultation = (doctor_id) => (dispatch, getState) => {
  // Headers

  // Request Body
  const body = {
    bookingDetails: {
      userName: getState().auth.user.userName ? getState().auth.user.userName: "",
      mobile: getState().auth.user.mobile,
      user: getState().auth.user._id,
      doctor: doctor_id,
    },
  };

  console.log(body);

  instance.post('consultantbooking/create', body)
      .then((res) => {
        console.log("***",res.data);
        dispatch({
          type: CALLBACK_TOKEN,
          payload: res.data,
        });
      })
      .catch(error=>{
        console.log(error)
      });


};

export const resetConsultToken = () =>(dispatch, getState)=>{
  // setTimeout(function () {
    dispatch({
      type: CALLBACK_TOKEN_NULL,
    });
  // }, 3000);
}