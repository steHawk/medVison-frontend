import axios from "axios";
import {createMessage} from "./messages"; //, returnErrors
import {CALLBACK_TOKEN, CALLBACK_TOKEN_NULL} from "./types";
import {FETCH_MED, GET_MED} from "../Context/types";
// import { Link } from "react-router-dom";

//  FETCH ALL MEDICINE BY TYPE


export const fetchMedicineByCategory = (category, currentPage, postsPerPage) => (dispatch) => {
    dispatch({type: FETCH_MED});
    let skip = currentPage*postsPerPage;
    let limit=postsPerPage;
    const         headers = {
            "Content-Type": "application/json",
        };
    console.log(category)

    let body = JSON.stringify({
        category,
    });
    console.log("body", body);
    fetch("https://api.emetroplus.com/drug/data/?skip=" + skip + "&limit=" + limit, {
        method: 'POST',
        headers,
        body,
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            dispatch({
                type: GET_MED,
                payload: data.data? data.data: []
            })
        })
        .catch((error) => {
            dispatch({
                type:GET_MED,
                payload:[],
            })
            console.error("error---->", error);
        })
}
// REGISTER USER
export const prescription = ({hno, street, pinCode, city, file_url}) => (dispatch, getState) => {
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
                dispatch(createMessage({prescriptionUploaded: "Prescription Uploaded Successfully"}));
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
    dispatch(createMessage({uploadFileError: "Error while uploading"}));
};

//
export const addressError = () => (dispatch, getState) => {
    dispatch(createMessage({addressError: "House Number or street Should is empty"}));
};

//
export const fileUploadSuccess = () => (dispatch, getState) => {
    dispatch(createMessage({fileUploadSuccess: "File Uploaded Successfully "}));
};

