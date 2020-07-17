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
import { tokenConfig } from "../../actions/authActions";

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
      address: JSON.parse(localStorage.getItem("shippingAddress")),
      houseNumber: JSON.parse(localStorage.getItem("shippingAddress")).doorNo,
      street: JSON.parse(localStorage.getItem("shippingAddress")).street,
      city: JSON.parse(localStorage.getItem("shippingAddress")).city,
      pincode: JSON.parse(localStorage.getItem("shippingAddress")).pincode,
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
            houseNumber: houseNumber,
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

    function handleExpand(e) {
      console.log("hi");
      document.querySelector("._2eTL2v").classList.toggle("content");
    }
    const { cartItems, total, user } = this.props;
    const { houseNumber, street, pincode, city } = this.state;

    // console.log(this.props.auth)
    // console.log(total);
    return (
      <Fragment>
        <div className="">
          <div className="_3B4tat">
            <div className="_7XMNLT">
              <h3 class="_1fM65H _2RMAtd">
                <span class="_1Tmvyj">1</span>
                <span class="_1_m52b">Delivery Address</span>
                {/* <div class="_3Ojtt3">
                <i class="fa fa-sort-desc" aria-hidden="true"></i>

              </div> */}
              </h3>
              <div class="_2o59RR">
                <div class="A1v2GV">
                  <div
                    id="CNTCTFD7EAA6757EE4AE0B9642D447"
                    class="_1i74Oi _2Y3Dxm"
                  >
                    <p class="_22O2Xt">
                      <span class="_3n0HwW">{this.state.name} &nbsp; </span>
                      <span class="_rmbzw"> &nbsp; &nbsp; </span>
                      <span class="_2kSC_X _3n0HwW">
                        Mobile Number : {this.state.mobileNumber}
                      </span>
                    </p>
                    <span class="_22O2Xt GeUS8P">
                      <div className="log-ele">
                        <label>door No : </label>
                        <input
                          type="text"
                          className=""
                          name="houseNumber"
                          onChange={this.onChange}
                          value={houseNumber}
                        />
                      </div>

                      <div className="log-ele">
                        <label>Street : </label>
                        <input
                          type="text"
                          className=""
                          name="street"
                          onChange={this.onChange}
                          value={street}
                        />
                      </div>

                      <div className="log-ele">
                        <label>City :</label>
                        <input
                          type="text"
                          className=""
                          name="city"
                          onChange={this.onChange}
                          value={city}
                        />
                      </div>

                      <div className="log-ele">
                        <label>PinCode : </label>
                        <input
                          type="text"
                          className=""
                          name="pincode"
                          onChange={this.onChange}
                          value={pincode}
                        />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="_3K1hJZ">
              <h3 class="_1fM65H _2RMAtd">
                <span class="_1Tmvyj">2</span>
                <span class="_1_m52b">Order Summary</span>

                <div class="_3Ojtt3">
                  <button onClick={handleExpand}>
                    <i class="fa fa-sort-desc" aria-hidden="true"></i>
                  </button>
                </div>
              </h3>
              <div class="_2eTL2v content">
                {cartItems.map((cartItem, index) => (
                  <div class="_2eTL2v" key={cartItem._id}>
                    <div class="_20egpM">
                      <div class="_3ycxrs">
                        <div class="PaJLWc">
                          <div class="_3vIvU_">
                            <div class="_1Ox9a7">
                              <div class="_325-ji">{cartItem.name}</div>
                            </div>
                            <div class="v7-Wbf"> {cartItem.packageSize} </div>

                            <span class="pMSy0p XU9vZa">₹{cartItem.sum}</span>
                            <div class="c8yCDe"></div>
                          </div>
                        </div>
                        <div class="_3cto0P">
                          <div class="_3RkJty">
                            <div class="_3md1dr">
                              <button
                                class="wNrY5O"
                                onClick={this.props.decrementQty.bind(
                                  this,
                                  cartItem.id,
                                  cartItem.quantity
                                )}
                              >
                                –
                              </button>
                              <div class="_2zH4zg">
                                <input
                                  type="text"
                                  value={cartItem.quantity}
                                  readOnly="true"
                                  class="_2csFM9"
                                />
                              </div>
                              <button
                                class="wNrY5O"
                                onClick={this.props.incrementQty.bind(
                                  this,
                                  cartItem.id,
                                  cartItem.quantity
                                )}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div class="_3IO2ev _2K02N8 _2x63a8">
                            <div class="gdUKd9" tabindex="12">
                              <span
                                onClick={this.props.deleteCartItems.bind(
                                  this,
                                  cartItem.id
                                )}
                              >
                                Remove
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {" "}
              <div class="_3K1hJZ">
                <h3 class="_1fM65H _2RMAtd">
                  <span class="_1Tmvyj">3</span>
                  <span class="_1_m52b">Payment Options</span>
                </h3>

                <div className="radio">
                  <label class="_8J-bZE _3C6tOa _1syowc _2i24Q8 _1Icwrf">
                    <input
                      type="radio"
                      value="Online"
                      checked={this.state.selectedOption === "Online"}
                      onChange={this.onValueChange}
                    />
                    &nbsp; Online
                  </label>
                </div>
                <div className="radio ">
                  <label class="_8J-bZE _3C6tOa _1syowc _2i24Q8 _1Icwrf">
                    <input
                      type="radio"
                      value="COD"
                      defaultChecked="true"
                      checked={this.state.selectedOption === "COD"}
                      onChange={this.onValueChange}
                    />
                    &nbsp; Cash On Delivery
                  </label>
                </div>

                <div>
                  Selected Payment option is : {this.state.selectedOption}
                </div>
                <div class="_3gijNv col-12-12 _2GJ0F-">
                  <div class="_31gTpz _1RLi8m">
                    {this.state.selectedOption === "Online" ? (
                      <button
                        class="_2AkmmA iwYpF9 _7UHT_c"
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
                    ) : (
                      <button
                        class="_2AkmmA iwYpF9 _7UHT_c"
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="_2qUgWb _3uHNGv _3CKRe3 _2kYif3">
            <div class="_2zqhDs _1lD380">
              <div class="_13wOiu">
                <span class="_2huYiT">Price details</span>
                <div class="_2twTWD">
                  <div class="hJYgKM">
                    <div class="_10vVqD">Price</div>
                    <span>
                      <div class="_2tarGe _1t3GGY">
                        <div>
                          <div class="_3GoQc2">₹{total}</div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div class="hJYgKM">
                    <div class="_10vVqD">Delivery Charges</div>
                    <span>
                      <span class="_27kB8M _3Oa-sk">Free</span>
                    </span>
                  </div>
                  <div class="_3xFQAD">
                    <div class="hJYgKM">
                      <div class="_10vVqD">Total Payable</div>
                      <span>
                        <div class="_2tarGe _1t3GGY">
                          <div>
                            <div class="_3GoQc2">₹{total}</div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
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
