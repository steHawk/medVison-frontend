import React, { Fragment } from "react";
import Cart from "./Cart";
import Billing from "./Billing";

function UserCart() {
  return (
    <Fragment>
      <div className="CCdiv">
        
      <Cart />

      <Billing />
      </div>
    </Fragment>
  );
}

export default UserCart;
