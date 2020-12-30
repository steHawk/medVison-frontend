import React, {Component, Fragment} from "react";
import {
    decrementQty,
    deleteCartItems,
    getCartItems,
    getCartTotal,
    incrementQty,
    quantity,
} from "../../actions/cartAction";
import {connect} from "react-redux";
import {cashOnDelivery} from "../../actions/orderAction";
import {Link, Redirect, withRouter} from "react-router-dom";
import instance from "../../api/instance";
import baseURL from "../../api/baseURL";

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
            mobileNumber: localStorage.getItem("number"),
            address: localStorage.getItem("address"),
            selectedOption: "COD",
            type: localStorage.getItem("cartItemType")
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCartItems();
    }

    // Event Change Functions

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onValueChange(event) {
        this.setState({
            selectedOption: event.target.value,
        });
    }

    // Update User Info

    updateUserInfo = (e) => {
        let url = `${baseURL}user/update`;

        fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
              "AuthType": "user"
            },
            body: JSON.stringify({
              user_id: localStorage.getItem("_id"),
              phoneNumber: this.state.mobileNumber,
              userDetails: {
                  [e.target.name] : e.target.value,
                _id: localStorage.getItem("_id"),
              },
            }),
          }).then((res) => {
              if(res.ok) {
                  console.log(res)
              }
          })
    }

    // Form Submission

    formSubmit(event) {
        event.preventDefault();
    }

    render() {

        const {medItems, testItems, totalTestItems, totalMedItems, user} = this.props;
        const {address, type} = this.state;

        // Razor Pay
        async function displayRazorpay() {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            const amount = this.state.type === "Medicine" ?  parseInt(medItems.length) * 100 : parseInt(testItems.length) * 100

            const cartItems = this.state.type === "Medicines" ? medItems : testItems

            let body =  
            {
                orderDetails: {
                userName: user.userName,
                mobile: user.mobile,
                amount: amount,
                payment_type: "Online",
                address: address,
                email: "",
                items: cartItems,
                orderType: this.state.type
                },
            }

            console.log(body)

            const data = await
                instance.post('order/create', body)
                    .then((res) => {
                        return res.data.order_details;
                    });

            const order_id = data._id;
            const options = {
                key: __DEV__ ? "rzp_test_5QLXOg1PbzjCFt" : "PRODUCTION_KEY",
                currency: data.rzOrderDetails.currency,
                amount: data.rzOrderDetails.amount.toString(),
                order_id: data.rzOrderDetails.id,
                name: "eMetroPlus",
                description: "Thank you for shopping",
                image: "http://localhost:1337/logo.svg",
                handler: function (response) {
                    const body = {
                        orderDetails: {
                            order_id: order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                    };
                    instance.put('order/update', body)
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
                        .catch((error) => console.log(error));
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

        if(!medItems.length > 0 && !testItems.length > 0) {
            return <Redirect to="/cart" />
        }

        return (
            <Fragment>
                <div className="container my-4">
                    <div className="row m-0">
                        <div className="col-lg-8">
                            <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
                                <div className="text-right">
                                    <a className="btn btn-primary" data-toggle="collapse" href="#updateAddress" role="button" aria-expanded="false" aria-controls="updateAddress">Update Address</a>
                                </div>
                                <form onSubmit={" "}>
                                    <div className="form-group collapse m-0" id="updateAddress">
                                        <h5 className="font-weight-bold mt-4">Your Address</h5>
                                        <textarea
                                            className="form-control mb-2"
                                            name="address"
                                            onChange={this.onChange}
                                            value={this.state.address}
                                            style={{resize: "none"}}
                                            rows="4"
                                        >&nbsp;</textarea>
                                        <div className="text-right mt-4">
                                            <button className="button-primary text-uppercase">
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <h5 className="font-weight-bold mt-2">Payment Options</h5>
                                <hr />
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
                                        { 
                                            (this.state.type === "Medicine" && this.state.address && this.state.mobileNumber)
                                            ?
                                            <button
                                                className="button-primary"
                                                onClick={displayRazorpay.bind(
                                                    this,
                                                    user,
                                                    totalMedItems,
                                                    medItems,
                                                    address,
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Confirm Order
                                            </button>
                                            :
                                            " "
                                        }

{ 
                                        (this.state.type === "Test" && this.state.address && this.state.mobileNumber)
                                            ?
                                            <button
                                                className="button-primary"
                                                onClick={displayRazorpay.bind(
                                                    this,
                                                    user,
                                                    totalTestItems,
                                                    testItems,
                                                    address,
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Confirm Order
                                            </button>
                                            :
                                            " "
                                        }

                                    </div>
                                ) : (
                                    <div className="text-center mt-4 mb-2">
                                        {
                                            (this.state.address && this.state.mobileNumber)
                                                ?
                                                <button
                                                    className="button-primary"
                                                    onClick={this.props.cashOnDelivery.bind(
                                                        this,
                                                        user,
                                                        totalTestItems,
                                                        testItems,
                                                        address,
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Confirm Order
                                                </button>
                                                :
                                                <p>Please Update your details...</p>
                                        }
                                    </div>

                                )}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="p-2 my-4 bg-white rounded-lg shadow-sm">
                            {/* Tab Headings depending on item type */}
                            {
                                type === "Medicine"
                                ?
                                <div className="m-2">
                                    <h5 className="font-weight-bold">Medicines</h5>
                                </div>
                                :
                                <div className="m-2">
                                    <h5 className="font-weight-bold">Tests</h5>
                                </div>
                            }
                            {
                                type === "Medicine"
                                ?
                                medItems.map((cartItem, index) => (
                                <Fragment key={cartItem._id}>
                                    <div className="row m-0">
                                        <div className="col-6 p-2">
                                            <small>Item:</small>
                                            <h6 className="font-weight-bold secondary-text">{cartItem.name}</h6>
                                        </div>
                                        <div className="col-3 text-center p-2">
                                            <small>Quantity:</small>
                                            <h6 className="font-weight-bold">{cartItem.quantity}</h6>
                                        </div>
                                        <div className="col-3 text-center p-2">
                                            <small>Price:</small>
                                            <p className="font-weight-bold">₹{cartItem.sum}</p>
                                        </div>
                                    </div>
                                    { medItems.length > 1 ? <hr className="m-0" /> : " " }
                                </Fragment>
                                ))
                                :
                                testItems.map((cartItem, index) => (
                                <Fragment key={cartItem._id}>
                                    <div className="row m-0">
                                        <div className="col-6 p-2">
                                            <small>Item:</small>
                                            <h6 className="font-weight-bold secondary-text">{cartItem.name}</h6>
                                        </div>
                                        <div className="col-3 text-center p-2">
                                            <small>Quantity:</small>
                                            <h6 className="font-weight-bold">{cartItem.quantity}</h6>
                                        </div>
                                        <div className="col-3 text-center p-2">
                                            <small>Price:</small>
                                            <p className="font-weight-bold">₹{cartItem.sum}</p>
                                        </div>
                                    </div>
                                    { testItems.length > 1 ? <hr className="m-0" /> : " " }
                                    </Fragment>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    medItems: state.cart.medItems,
    testItems: state.cart.testItems,
    isAuthenticated: state.auth.isAuthenticated,
    totalMedItems: getCartTotal(state.cart.medItems),
    totalTestItems: getCartTotal(state.cart.testItems),
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
