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
import {Link} from "react-router-dom";
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
        const {address} = this.state;

        const totalItems = totalMedItems.length + totalTestItems.length

        const items = this.medItems+this.testItems

        // Razor Pay
        async function displayRazorpay() {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            let body =  
            {
                orderDetails: {
                userName: user.userName,
                mobile: user.mobile,
                amount: parseInt(totalItems) * 100,
                payment_type: "Online",
                address: address,
                email: user.email,
                items: medItems + testItems,
                },
            }

            const data = await
                instance.post('order/create', body)
                    .then((res) => {
                        return res.data.order_details;
                    });

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

        return (
            <Fragment>
                <div className="container my-4">
                    <div className="row m-0">
                        <div className="col-lg-8">
                            <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
                                <h5 className="font-weight-bold">Confirm Details</h5>
                                <hr />
                                <form onClick="">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            className="form-control mb-2"
                                            name="userName"
                                            value={this.state.name}
                                            style={{backgroundColor: "white"}}
                                            onChange={this.onChange}
                                        />
                                        <label>Mobile Number</label>
                                        <input
                                            className="form-control mb-2"
                                            name="phoneNumber"
                                            onChange={this.onChange}
                                            value={this.state.mobileNumber}
                                            style={{backgroundColor: "white"}}
                                        />

                                        <label>Address</label>
                                        <textarea
                                            className="form-control mb-2"
                                            name="address"
                                            onChange={this.onChange}
                                            value={this.state.address}
                                            style={{resize: "none"}}
                                            rows="4"
                                        >&nbsp;</textarea>
                                        <div className="text-right mt-4">
                                            <button className="button-primary">
                                                <Link to={{
                                                    pathname: "/profileUpdate",
                                                    state: {medItems, totalMedItems, user, refTo: "billing"}
                                                }} style={{color: "white"}}>
                                                    Change
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
                                <h5 className="font-weight-bold">Payment Options</h5>
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
                                            (this.state.address && this.state.mobileNumber)
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
                                                <p>Please Update your details</p>
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
                            { 
                            medItems.length > 0 
                            ?
                            <div className="m-2">
                                <h5 className="font-weight-bold">Medicines</h5>
                            </div>
                            : "" 
                            }
                            {
                            medItems.map((cartItem, index) => (
                            <Fragment key={cartItem._id}>
                                <div className="p-2 px-lg-4">
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
                            {
                            testItems.length > 0 
                            ? 
                            <div className="m-2">
                                <h5 className="font-weight-bold mt-4 mb-2">Tests</h5>
                            </div>
                            : 
                            "" 
                            }
                            {testItems.map((cartItem, index) => (
                            <Fragment key={cartItem._id}>
                                <div className="p-2 px-lg-4">
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
