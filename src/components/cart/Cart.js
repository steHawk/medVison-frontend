
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
// import Billing from "./Billing";
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
    // isAuthenticated: PropTypes.string,
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
    console.log(this.props)
    return (
      <Fragment>
        <div className="container my-4">
          <div className="row m-0">
            <div className="col-lg-6 col-md-6">
              <h5 className="font-weight-bold">Cart</h5>
              <hr />
              {cartItems.map((cartItem, index) => (
                <div className="bg-white rounded-lg shadow-sm p-4 my-4 " key={cartItem._id}>
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
                        readOnly
                        className="form-control"
                      />
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-outline-primary rounded-circle"
                        onClick={this.props.incrementQty.bind(
                          this,
                          cartItem.id,
                          cartItem.quantity
                        )}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-4 text-right" tabIndex="12">
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
              <div className="text-center">
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
            <div className="col-lg-6 col-md-6">
              <h5 className="font-weight-bold">Price details</h5>
              <hr />
              <div className="bg-white rounded-lg shadow-sm">
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
});
export default connect(mapStateToProps, {
  getCartItems,
  deleteCartItems,
  quantity,
  decrementQty,
  incrementQty,
})(Cart);
