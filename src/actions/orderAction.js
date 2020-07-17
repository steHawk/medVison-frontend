import { FETCH_TESTS, FETCH_ALL_TESTS } from "./types";

import axios from "axios";
import { deleteCartItems } from "./cartAction";

export const cashOnDelivery = (
  user,
  total,
  cartItems,
  houseNumber,
  street,
  pincode,
  city
) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(cartItems);

  // Request Body
  const body = {
    orderDetails: {
      userName: user.userName,
      mobile: user.mobile,
      amount: parseInt(total) * 100,
      payment_type: "COD",
      location: {
        houseNumber: houseNumber,
        street: street,
        pincode: pincode,
        city: city,
      },
      email: user.email,
      items: cartItems,
    },
  };

  axios
    .post("https://api.emetroplus.com/order/create", body, config)
    .then((res) => {
      console.log(res);
      if (res.data.ok) {
        res.data.order_details.items.forEach((el) => {
          console.log(el.id)
          dispatch(deleteCartItems(el.id));
        });
      }else {
        
      }
    })
    .catch((error) => console);
};
