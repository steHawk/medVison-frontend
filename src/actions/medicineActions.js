import axios from "axios";
import { createMessage } from "./messages";//, returnErrors

import { CALLBACK_TOKEN, CALLBACK_TOKEN_NULL } from "./types";
// import { Link } from "react-router-dom";

//  FETCH ALL MEDICINE BY TYPE


// export const fetchMedicineByType = async (limit, skip) => async (dispatch) => {
//   const process = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const value = {
//     limit: limit,
//     skip: skip,
//   };
//   try {
//     const res = await axios.post("https://api.emetroplus.com/drug/data", value, process)
//     console.log(res);
//     dispatch({
//       type: MEDICINE_BY_TYPES,
//       payload: res.data.data,
//     });
//   } catch (err) {
//     console.log(err)

//   }
// };
// REGISTER USER
export const prescription = ({ hno, street, pinCode, city, file_url }) => (
  dispatch,
  getState
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    prescriptionDetails: {
      userName: localStorage.getItem("user"),
      email: localStorage.getItem("email"),
      mobile: localStorage.getItem("number"),
      age: localStorage.getItem("age"),
      gender: localStorage.getItem("gender"),
      prescriptionImg: file_url,
      address: {
        doorNo: hno,
        street: street,
        pincode: pinCode,
        city: city,
      },
      user: localStorage.getItem("_id"),
    },
  };

  axios
    .post("https://api.emetroplus.com/prescription/upload", body, config)
    .then((res) => {
      // console.log(res);
      if (res.data.ok) {
        dispatch(createMessage({ prescriptionUploaded: "Prescription Uploaded Successfully" }));
        dispatch({
          type: CALLBACK_TOKEN,
          payload: res.data,
        });
        setTimeout(function () {
          dispatch({
            type: CALLBACK_TOKEN_NULL,
          });
        }, 3000);
      } else {
        console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//
export const uploadFileError = () => (dispatch, getState) => {
  dispatch(createMessage({ uploadFileError: "Error while uploading" }));
};



// 
export const addressError = () => (dispatch, getState) => {
  dispatch(createMessage({ addressError: "House Number or street Should is empty" }));
};



// 
export const fileUploadSuccess = () => (dispatch, getState) => {
  dispatch(createMessage({ fileUploadSuccess: "File Uploaded Successfully " }));
};

