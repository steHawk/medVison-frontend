import {
  GET_CART_ITEMS,
  DELETE_CART_ITEM,
  INCREASE_QUANTITY,
  DECREMENT_QTY,
} from "./types";

import { tokenConfig } from "./authActions";
import { createMessage } from "./messages"; //, returnErrors
// import React from "react";

import axios from "axios";
// import { Redirect, Link } from "react-router-dom";

// ADD To Cart
export const addCart = (
  // _,
  item_id,
  test_name,
  test_desc,
  test_price,
  packSize,
  type
) => (dispatch, getState) => {
  // console.log(item_id, test_name, test_desc, test_price, packSize, type );
  const body = {
    user_id: localStorage.getItem("_id"),
    item: {
      id: item_id,
      name: test_name,
      price: test_price,
      type: type,
      quantity: 1,
      sum: 0,
      // packageSize: packSize,
    },
  };
  console.log(body);
  axios
    .post(
      "https://api.emetroplus.com/user/additem",
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ itemAdded: res.data.message }));
      // console.log(res)
    })
    .catch((err) => console.log(err));
};

// GET Cart Items
export const getCartItems = () => (dispatch, getState) => {
  const body = {
    user_id: localStorage.getItem("_id"),
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
  // console.log(item_id)
  const body = {
    user_id: localStorage.getItem("_id"),
    item_id: item_id,
  };
  // console.log(body)
  axios
    .post(
      `https://api.emetroplus.com/user/removeitem`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res);
      dispatch({
        type: DELETE_CART_ITEM,
        payload: item_id,
      });
      dispatch(createMessage({ itemDel: res.data.message }));
    })
    .catch((err) => console.log(err));
};

export const quantity = (item_id) => (dispatch, getState) => {
  dispatch({
    type: INCREASE_QUANTITY,
    payload: item_id,
  });
};

export const incrementQty = (productId, quan) => (dispatch, getState) => {
  // console.log(productId);

  let quantity = quan + 1;

  const body = {
    user_id: localStorage.getItem("_id"),
    item: {
      id: productId,
      quantity: quantity,
    },
  };
  axios
    .post(
      `https://api.emetroplus.com/user/updateitem`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res);
      if (res.data.ok) {
        dispatch({
          type: INCREASE_QUANTITY,
          productId,
        });
      } else {
        console.log("error");
      }
    })
    .catch((err) => console.log(err));
};

export const decrementQty = (productId, quan) => (dispatch, getState) => {
  // console.log(productId);
  
  let quantity = quan - 1;

  if (quantity < 1)
    quantity = 1

  const body = {
    user_id: getState().auth.user._id,
    item: {
      id: productId,
      quantity: quantity,
    },
  };
  axios
    .post(
      `https://api.emetroplus.com/user/updateitem`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res);
      if (res.data.ok) {
        dispatch({
          type: DECREMENT_QTY,
          productId,
        });
      } else {
        console.log("error");
      }
    })
    .catch((err) => console.log(err));
};

export const getCartTotal = (cartItems) => {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total +=
      parseInt(cartItems[i].quantity, 10) * parseInt(cartItems[i].price, 10);
  }
  return total;
};
