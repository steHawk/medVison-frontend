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
        <div className="container my-4">
          <div className="row m-0">
            <div className="col-lg-6 col-md-6">
              <h4 className="font-weight-bold">Cart</h4>
              {cartItems.map((cartItem, index) => (
                <div class="shadow p-3 my-3" key={cartItem._id}>
                  <div class="row">
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
                  <div class="row mt-2">
                    <div className="col-2">
                      <button
                        class="btn btn-outline-danger"
                        onClick={this.props.decrementQty.bind(
                          this,
                          cartItem.id,
                          cartItem.quantity
                        )}
                      >
                        –
                      </button>
                    </div>
                    <div class="col-4">
                      <input
                        type="text"
                        value={cartItem.quantity}
                        readOnly="true"
                        class="form-control"
                      />
                    </div>
                    <div className="col-2">
                      <button
                        class="btn btn-outline-success"
                        onClick={this.props.incrementQty.bind(
                          this,
                          cartItem.id,
                          cartItem.quantity
                        )}
                      >
                        +
                      </button>
                    </div>
                    <div class="col-4 text-right" tabindex="12">
                      <button
                        onClick={this.props.deleteCartItems.bind(
                          this,
                          cartItem.id
                        )}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
              <div class="text-center">
                <Link
                  to={{
                    pathname: "/checkout",
                  }}
                >
                  {" "}
                  <button className="btn btn-success">Place Order</button>
                </Link>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 my-auto shadow">
              <div className="mt-4">
                <h4 class="font-weight-bold">Price details</h4>
              </div>
              <table class="table responsive-table">
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
