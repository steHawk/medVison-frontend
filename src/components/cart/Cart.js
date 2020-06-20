import React, { Component } from "react";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCartItems, deleteCartItems } from "../../actions/cartAction";
// import { Redirect } from "react-router-dom";
import Billing from "./Billing";
import { Fragment } from "react";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numofitems: 1,
            price: 0
        }
    }
    static propTypes = {
        deleteCartItems: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,

    };

    componentDidMount() {
        this.props.getCartItems();
    }

    setPrice(e) {
        this.setState({
            numofitems: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="cart">
                        <p>Cart Items</p>
                        <hr></hr>
                        {this.props.cartItems.map((cartItem, index) => (
                            <div key={cartItem._id} className="cart_items">
                                <div key={index}>
                                    <div className="CDiv">
                                        <p>{cartItem.name}</p>
                                        <p>₹{cartItem.price}</p>
                                    </div>
                                    <div className="CDiv">
                                        <div className="counter">
                                            <input type="button" value="-" />
                                            {/* onClick={() => this.removeItem(cartItem)}  */}
                                            <input type="text" min="1" name="quantity"
                                                key={cartItem._id} id={cartItem._id}
                                                value={this.state.numofitems}
                                                onChange={(e) => this.setPrice(e)} />
                                            <input type="button" value="+" />
                                            {/* onClick={() => this.addItem(cartItem)} */}
                                        </div>
                                        <svg
                                            onClick={this.props.deleteCartItems.bind(this, cartItem.id)}
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
                    </div>
                </div>
                <div>
                    <Billing cartItems={this.props.cartItems}/>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getCartItems, deleteCartItems })(
    Cart
);