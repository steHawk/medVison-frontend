import React, { Fragment } from "react";
import Cart from "./Cart";
import Billing from "./Billing";

function UserCart() {
  return (
    <Fragment>
      <Cart />

      <Billing />
    </Fragment>
  );
}

export default UserCart;
