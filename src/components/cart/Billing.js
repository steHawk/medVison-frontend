import React, { Component } from "react";

class Billing extends Component {
  render() {
    return (
      <div>
      <div className="bill">
        <p>Billing Details</p>
        <hr></hr>
        <div className="mrp">
          <div className="price">
            <p>Total MRP</p>
            <p>₹2690</p>
          </div>
          <div className="price">
            <p>Total Discount</p>
            <p>- ₹1841</p>
          </div>
        </div>
        <div className="charges">
          <p>Collection Charges</p>
          <p>0</p>
        </div>
        <hr></hr>
        <div className="total">
          <div className="total_save">
            <p>Total</p>
            <p>You save ₹1841 on your order!</p>
          </div>
          <div className="total_price">
            <p>₹849</p>
          </div>
        </div>
        <button>Proceed to checkout</button>
      </div>
      </div>
    );
  }
}
export default Billing;
