import React, { Component } from "react";
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
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

// Assets
import emptyCart from "../../assets/emptyCart.svg";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      cartItemType: "Medicine",
      type: null
    };
    this.onMedicinesOrder = this.onMedicinesOrder.bind(this)
    this.onTestsOrder = this.onTestsOrder.bind(this)
  }

  static propTypes = {
    deleteCartItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCartItems();
  }

  onMedicinesOrder() {
    this.setState({
      redirect: true,
    })
    localStorage.setItem('cartItemType', 'Medicine')
  }

  onTestsOrder() {
    this.setState({
      redirect: true,
    })
    localStorage.setItem('cartItemType', 'MedicalTest')
  }

  render() {
    const { medItems,testItems, totalMedItems , totalTestItems} = this.props;

    if(this.state.redirect) {
      return <Redirect to={{ pathname: "/checkout" }} />
    }

    if(medItems.length === 0 && testItems.length === 0 ) {
      return (
        <div className="container my-4">
          <div className="row m-0">
            <div className="col-lg-6 col-md-8 mx-auto my-2 py-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-weight-bold">Your Cart</h4>
              <hr />
              <div className="text-center">
                <img src={emptyCart} alt="Empty Cart" width="200px" />
                <p className="my-4 font-weight-bold">Your Cart is Empty</p>
                <Link to="/meditems" className="text-white font-weight-bold">
                  <button className="btn btn-primary rounded-pill">
                    Start adding items
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    } 
    else {
      return (
        <Fragment>
          <div className="container my-4">
            <div className="row m-0">
              <div className="col-lg-10 col-md-12 p-0 mx-auto">
                <div className="row m-0">
                  <div className="col-lg-8 col-md-8 my-2 py-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-weight-bold">Your Cart</h4>
                    <hr />
                    { 
                    medItems.length > 0 
                    ?
                    <Fragment>
                      <h5 className="font-weight-bold">Medicines</h5>
                    </Fragment>
                    : "" 
                    }
                    {
                    medItems.map((cartItem, index) => (
                      <Fragment  key={cartItem._id}>
                        <div className="px-lg-4 py-2">
                          <div className="row">
                            <div className="col-6 my-auto">
                              <h6 className="font-weight-bold secondary-text">{cartItem.name}</h6>
                            </div>
                            <div className="col-3 my-auto">
                              <h6>{cartItem.packageSize}</h6>
                            </div>
                            <div className="col-3 my-auto text-right">
                              <p className="font-weight-bold">₹{cartItem.sum}</p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-2">
                              <button
                                className="btn text-white secondary-bg rounded-circle"
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
                                className="btn text-white secondary-bg rounded-circle"
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
                                className="btn text-white bg-dark rounded-circle"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    ))
                    }
  
                    {/* Check if medItems are in Cart */}
                    {medItems.length > 0 ?
                    <div className="text-right px-lg-4 mb-2">
                        <button className="btn btn-primary" onClick={this.onMedicinesOrder}>Place Order</button>
                    </div> : ""
                    }
                    
                    {
                    testItems.length > 0 
                    ? 
                    <h5 className="font-weight-bold mt-4 mb-2">Tests</h5>
                    : 
                    "" 
                    }
                    {testItems.map((cartItem, index) => (
                      <Fragment key={cartItem._id}>
                        <div className="px-lg-4 py-2">
                          <div className="row">
                            <div className="col-6 my-auto">
                              <h6 className="font-weight-bold secondary-text">{cartItem.name}</h6>
                            </div>
                            <div className="col-3 my-auto">
                              <h6>{cartItem.packageSize}</h6>
                            </div>
                            <div className="col-3 my-auto text-right">
                              <p className="font-weight-bold">₹{cartItem.sum}</p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-2">
                              <button
                                  className="btn text-white secondary-bg rounded-circle"
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
                                  className="btn text-white secondary-bg rounded-circle"
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
                                  className="btn text-white bg-dark rounded-circle"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    ))}
                    {testItems.length > 0 ? 
                    <div className="text-right px-lg-4">
                        <button className="btn btn-primary" onClick={this.onTestsOrder}>Place Order</button>
                    </div>
                    : "" }
                    
                  </div>
                  <div className="col-lg-4 col-md-4 my-2 ">
                    <div className="bg-white rounded-lg shadow-sm p-2">
                      <div className="m-2">
                        <h5 className="font-weight-bold">Medicines Price</h5>
                      </div>
                      <hr />
                      <div className="responsive-table">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>Med Items Price</td>
                              <td className="font-weight-bold">₹{totalMedItems}</td>
                            </tr>
                            <tr>
                              <td>Delivery Charges</td>
                              <td className="font-weight-bold">Free</td>
                            </tr>
                            <tr>
                              <td>Total Payable</td>
                              <td className="font-weight-bold">₹{totalMedItems}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                    <div className="bg-white rounded-lg shadow-sm p-2">
                      <div className="m-2">
                        <h5 className="font-weight-bold">Tests Price</h5>
                      </div>
                      <hr />
                      <div className="responsive-table">
                        <table className="table table-borderless">
                          <tbody>
                          <tr>
                            <td>Test Items Price</td>
                            <td className="font-weight-bold">₹{totalTestItems}</td>
                          </tr>
                          <tr>
                            <td>Delivery Charges</td>
                            <td className="font-weight-bold">Free</td>
                          </tr>
                          <tr>
                            <td>Total Payable</td>
                            <td className="font-weight-bold">₹{totalTestItems}</td>
                          </tr>
                          </tbody>
                        </table>
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
}
const mapStateToProps = (state) => ({
  medItems: state.cart.medItems,
  testItems: state.cart.testItems,
  isAuthenticated: state.auth.isAuthenticated,
  totalMedItems: getCartTotal(state.cart.medItems),
  totalTestItems: getCartTotal(state.cart.testItems),
});
export default connect(mapStateToProps, {
  getCartItems,
  deleteCartItems,
  quantity,
  decrementQty,
  incrementQty,
})(Cart);
