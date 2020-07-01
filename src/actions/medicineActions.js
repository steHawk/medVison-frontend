import axios from "axios";

import { MEDICINE_BY_TYPES } from "./types";

//  FETCH ALL MEDICINE BY TYPE

export const fetchMedicineByType = (limit, skip) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    limit: limit,
    skip: skip,
  };

  axios
    .post("https://api.emetroplus.com/drug/data", body, config)
    .then((res) => {
      console.log(res);
      dispatch({
        type: MEDICINE_BY_TYPES,
        payload: res.data.data,
      });
    });
};

// REGISTER USER
export const prescription = ({ hno, street, pinCode, city, file_url }) => (
  dispatch , getState
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
    }


  axios
    .post("https://api.emetroplus.com/prescription/upload", body, config)
    .then((res) => {
      console.log(res);
      if(res.data.ok){
          
      }else {
        console.log("error")
      }
      
    }).catch((error) => {
      console.log(error)
    })
};
