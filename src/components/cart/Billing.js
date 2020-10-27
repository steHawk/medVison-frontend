import React, { Component, Fragment } from "react";

import axios from "axios";
import {
  getCartTotal,
  getCartItems,
  deleteCartItems,
  quantity,
  decrementQty,
  incrementQty,
} from "../../actions/cartAction";
import { connect } from "react-redux";
import { cashOnDelivery } from "../../actions/orderAction";
import { Link } from "react-router-dom";
// import Cart from "./Cart";
// import { tokenConfig } from "../../actions/authActions";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("user"),
      email: localStorage.getItem("email"),
      mobileNumber: localStorage.getItem("number"),
      age: localStorage.getItem("age"),
      gender: localStorage.getItem("gender"),
      address: localStorage.getItem("address"),
      // address: JSON.parse(localStorage.getItem("shippingAddress")),
      // houseNumber: JSON.parse(localStorage.getItem("shippingAddress")).doorNo,
      // street: JSON.parse(localStorage.getItem("shippingAddress")).street,
      // city: JSON.parse(localStorage.getItem("shippingAddress")).city,
      // pincode: JSON.parse(localStorage.getItem("shippingAddress")).pincode,
      selectedOption: "COD",
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCartItems();
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    async function displayRazorpay() {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // const data = await fetch("http://localhost:1337/razorpay", {
      //   method: "POST",
      // }).then((t) => t.json());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(user , total)
      const body = {
        orderDetails: {
          userName: user.userName,
          mobile: user.mobile,
          amount: parseInt(total) * 100,
          payment_type: "Online",
          location: {
            houseNumber: address,
            street: street,
            pincode: pincode,
            city: city,
          },
          email: user.email,
          items: cartItems,
        },
      };

      const data = await axios
        .post("https://api.emetroplus.com/order/create", body, config)
        .then((res) => {
          return res.data.order_details;
        });

      console.log(data);
      const order_id = data._id;
      const options = {
        key: __DEV__ ? "rzp_test_PDlp4aGAWXBD2H" : "PRODUCTION_KEY",
        currency: data.rzOrderDetails.currency,
        amount: data.rzOrderDetails.amount.toString(),
        order_id: data.rzOrderDetails.id,
        name: "eMetroPlus",
        description: "Thank you for shopping",
        image: "http://localhost:1337/logo.svg",
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);

          const body = {
            orderDetails: {
              order_id: order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
          };

          // const data = axios
          //   .put("https://api.emetroplus.com/order/update", body, config)
          //   .then((res) => {
          //     return res;

          //   });
          // console.log(data);

          axios
            .put("https://api.emetroplus.com/order/update", body, config)
            .then((res) => {
              console.log(res);
              if (res.data.ok === true) {
                res.data.order_details.items.forEach((el) => {
                  console.log(el.id);
                  deleteCartItems(el.id);
                });
              } else {
              }
            })
            .catch((error) => console);
        },
        prefill: {
          name: user.userName,
          email: user.email,
          phone_number: user.mobile,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }

  

    // function handleExpand(e) {
    //   console.log("hi");
    //   document.querySelector("._2eTL2v").classList.toggle("content");
    // }
    const { cartItems, total, user } = this.props;
    const { houseNumber, street, pincode, city, address } = this.state;

    // console.log(this.props.auth)
    // console.log(total);
    return (
      <Fragment>
        <div className="container my-4">
          <div className="row m-0">
            <div className="col-lg-6 ">
              <h4 className="font-weight-bold mb-4">Delivery Address</h4>
              <div className="p-4 my-4 bg-white rounded-lg shadow-sm">


                <div className="form-group">
                  <label>User Name : </label>
                  <input
                    className="form-control mb-2"
                    value={localStorage.getItem("userName")}
                    style={{ backgroundColor: "white" }}
                    readOnly
                  />
                  <label>Mobile Number : </label>
                  <input
                    className="form-control mb-2"
                    value={this.state.mobileNumber}
                    style={{ backgroundColor: "white" }}
                    readOnly
                  />

                  <label>Address : </label>
                  <textarea
                    className="form-control mb-2"
                    name="address"
                    onChange={this.onChange}
                    value={this.state.address}
                    style={{ resize: "none" }}
                    rows="8"
                    disabled
                  ></textarea>
                  <button className="button-primary">
                    <Link to="/profileUpdate" style={{ color: "white" }}>
                      Change
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6" style={{ position: "relative" }} >
              <h4 className="font-weight-bold">Order Summary</h4>
              <div className="_2eTL2v content">
                {cartItems.map((cartItem, index) => (
                  <div
                    className="p-4 my-4 bg-white rounded-lg shadow-sm"
                    key={cartItem._id}
                  >
                    <div className="row">
                      <div className="col-6 my-auto">
                        <h6 className="font-weight-bold">{cartItem.name}</h6>
                      </div>
                      <div className="col-3 my-auto">
                        <h6>{cartItem.packageSize}</h6>
                      </div>
                      <div className="col-3 my-auto">
                        <p>₹{cartItem.sum}</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-2">
                        <button
                          className="btn btn-outline-danger rounded-circle"
                          onClick={this.props.decrementQty.bind(
                            this,
                            cartItem.id,
                            cartItem.quantity
                          )}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <div className="col-4">
                        <input
                          type="text"
                          value={cartItem.quantity}
                          readOnly="true"
                          className="form-control"
                        />
                      </div>
                      <div className="col-2">
                        <button
                          className="btn btn-outline-success rounded-circle"
                          onClick={this.props.incrementQty.bind(
                            this,
                            cartItem.id,
                            cartItem.quantity
                          )}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                      <div className="col-4 text-right" tabindex="12">
                        <button
                          onClick={this.props.deleteCartItems.bind(
                            this,
                            cartItem.id
                          )}
                          className="btn btn-danger rounded-circle"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <div className="row m-0">
            <div className="col-lg-6 col-md-6">
              <h4 className="font-weight-bold">Payment Options</h4>
              <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
                {" "}
                <div className="input-group my-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        aria-label="Online Pay"
                        value="Online"
                        checked={this.state.selectedOption === "Online"}
                        onChange={this.onValueChange}
                      />
                    </div>
                  </div>
                  <p className="form-control">Online</p>
                </div>
                <div className="input-group my-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        value="COD"
                        defaultChecked="true"
                        checked={this.state.selectedOption === "COD"}
                        onChange={this.onValueChange}
                      />
                    </div>
                  </div>
                  <p className="form-control">Cash On Delivery</p>
                </div>
                <h6 className="text-success my-2">
                  Selected Payment option is : {this.state.selectedOption}
                </h6>
                {this.state.selectedOption === "Online" ? (
                  <div className="text-center mt-4 mb-2">
                    <button
                      className="button-primary"
                      onClick={displayRazorpay.bind(
                        this,
                        user,
                        total,
                        cartItems,
                        houseNumber,
                        street,
                        pincode,
                        city
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Confirm Order
                    </button>
                  </div>
                ) : (
                    <div className="text-center mt-4 mb-2">
                      <button
                        className="button-primary"
                        onClick={this.props.cashOnDelivery.bind(
                          this,
                          user,
                          total,
                          cartItems,
                          houseNumber,
                          street,
                          pincode,
                          city
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Confirm Order
                    </button>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <h4 className="font-weight-bold">Price details</h4>
              <div className="bg-white rounded-lg shadow-sm p-4 my-4">
                <div className="responsive-table">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <td className="font-weight-bold">₹{total}</td>
                      </tr>
                      <tr>
                        <td>Delivery Charges</td>
                        <td className="font-weight-bold">Free</td>
                      </tr>
                      <tr>
                        <td>Total Payable</td>
                        <td className="font-weight-bold">₹{total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  isAuthenticated: state.auth.isAuthenticated,
  total: getCartTotal(state.cart.cartItems),
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  getCartItems,
  deleteCartItems,
  quantity,
  decrementQty,
  incrementQty,
  cashOnDelivery,
})(Billing);
