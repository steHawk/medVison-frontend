import React, { Component } from "react";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCartItems,
  deleteCartItems,
  quantity,
  decrementQty,
  incrementQty,
  getCartTotal,
} from "../../actions/cartAction";
// import { Redirect } from "react-router-dom";
import Billing from "./Billing";
import { Fragment } from "react";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cartItems: [],
    };
  }
  static propTypes = {
    deleteCartItems: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getCartItems();
  }

  // setPrice(id) {
  //   this.setState((prevState) => ({
  //     cartItems: prevState.cartItems
  //       .filter((item) => item._id === id)
  //       .map((item) => (item.quantity = parseInt(item.quantity) + 1)),
  //   }));
  // }

  render() {
    // this.state.cartItems = this.props.cartItems;
    const { cartItems, total } = this.props;
    return (
      <Fragment>
        <div>
          {/* <div className="cart">
            <p>Cart Items</p>
            <hr></hr>
            {cartItems.map((cartItem, index) => (
              <div key={cartItem._id} className="cart_items">
                <div key={index}>
                  <div className="CDiv">
                    <p>{cartItem.name}</p>
                    <p>₹{cartItem.sum}</p>
                  </div>
                  <div className="CDiv">
                    <div className="counter">
                      <input
                        type="button"
                        value="-"
                        onClick={this.props.decrementQty.bind(
                          this,
                          cartItem.id
                        )}
                      />

                      <input
                        type="text"
                        min="1"
                        name="quantity"
                        key={cartItem._id}
                        id={cartItem._id}
                        value={cartItem.quantity}
                        readOnly={true}
                      />
                      <input
                        type="button"
                        value="+"
                        onClick={this.props.incrementQty.bind(
                          this,
                          cartItem.id
                        )}
                      />
                    </div>
                    <svg
                      onClick={this.props.deleteCartItems.bind(
                        this,
                        cartItem.id
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            
          </div> */}
          <div class="ooJZfD _3FGKd2 col-12-12">
            <div class="_3gijNv col-3-12">
              <div class="_2EoEbp">
                <div class="_1lBhq8">Cart </div>
                <div></div>
              </div>
            </div>
          </div>
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

          <div class="_3gijNv col-12-12 _2GJ0F-">
            <div class="_31gTpz _1RLi8m">
              <Link
                to={{
                  pathname: "/checkout",
                 
                }}
              >
                {" "}
                <button class="_2AkmmA iwYpF9 _7UHT_c">
                  <span>Place Order</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div>
          {/* <div className="bill">
            <p>PRICE DETAILS</p>
            <hr></hr>
            <div className="mrp">
              <div className="price">
                <p>Total MRP</p>
                <p>₹{total}</p>
              </div>
              <button>
                {" "}
                <Link
                      to={{
                        pathname: "/checkout",
                        state: { total: total },
                      }}>
                      {" "}
                       Checkout 
                    </Link>
              </button>
            </div> 
          </div> */}
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
});
export default connect(mapStateToProps, {
  getCartItems,
  deleteCartItems,
  quantity,
  decrementQty,
  incrementQty,
})(Cart);
