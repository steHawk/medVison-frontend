import { GET_CART_ITEMS, DELETE_CART_ITEM } from "./types";
import { tokenConfig } from "./authActions";
import { createMessage } from "./messages";//, returnErrors
// import React from "react";

import axios from "axios";
// import { Redirect, Link } from "react-router-dom";

// ADD To Cart
export const addCart = (item_id, test_name, test_desc, test_price, type) => (
  dispatch,
  getState
) => {
  // console.log(item_id, test_name, test_desc, test_price, type);
  const body = {
    user_id: getState().auth.user._id,

    item: {
      id: item_id,
      name: test_name,
      price: test_price,
      type: type,
    },
  };
   //console.log(body)
  axios
    .post(
      "https://api.emetroplus.com/user/additem",
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ itemAdded: res.data.message }));
    })
    .catch((err) => console.log(err));
};

// GET Cart Items
export const getCartItems = () => (dispatch, getState) => {
  const body = {
    user_id: getState().auth._id,
  };
  // console.log("body");
  //console.log(body);
  axios
    .post(
      "https://api.emetroplus.com/user/getcartitems",
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_CART_ITEMS,
        payload: res.data.cart_items_list,
      });
    });
};

// Delete Cart Item

export const deleteCartItems = (item_id) => (dispatch, getState) => {
  const body = {
    user_id: getState().auth.user._id,
    item_id: item_id,
  };
  axios
    .post(
      `https://api.emetroplus.com/user/removeitem`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: DELETE_CART_ITEM,
        payload: item_id,
      });
      dispatch(createMessage({ itemDel: res.data.message }));
    })
    .catch((err) => console.log(err));
};
