// import { FETCH_TESTS, FETCH_ALL_TESTS } from "./types";

import axios from "axios";
import {FETCH_ORDERS_FAILED, FETCH_ORDERS_INIT, FETCH_ORDERS_SUCCESS} from "./types";
// import { deleteCartItems } from "./cartAction";

export const cashOnDelivery = (
    user,
    total,
    cartItems,
    address,
    type,
) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    };
    console.log(cartItems);

    // Request Body
    const body = {
        orderDetails: {
            user: localStorage.getItem('_id'),
            userName: user.userName,
            mobile: user.mobile,
            amount: parseInt(total) * 100,
            payment_type: "COD",
            address:address,
            email: user.email,
            items: cartItems,
            orderType: type,
            orderStatus: 'created',
        },
    };
    console.log(body)

    axios
        .post("https://api.emetroplus.com/order/create", body, config)
        .then((res) => {
            console.log(res);
            if (res.data.ok) {
                window.location.href="/yourOrders";
                // window.re
            } else {

            }
        })
        .catch((error) => console);
};

export const getOrders = () => (dispatch, getState) => {
    let user = localStorage.getItem("_id");
    let body = {
        user,
        // status: "created",
    };
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    };
    dispatch({type: FETCH_ORDERS_INIT})
    axios
        .post('https://api.emetroplus.com/order/data?skip=0&limit=20', body, config)
        .then(response => {
            console.log("orders response data",response.data)
            dispatch({type: FETCH_ORDERS_SUCCESS, payload: response.data.orders});
        })
        .catch(error => {
            // console.log("orders error", error)
            dispatch({type: FETCH_ORDERS_FAILED, error: "Orders Fetching failed"});
        })
}