import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOrders} from "../../actions/orderAction";
import {Redirect} from "react-router-dom";
import PreLoader from "../layout/PreLoader";

class Orders extends Component {
    render() {
        console.log('orders', this.props.orders)
        if (this.props.auth.isAuthenticated) {
            let {orders} = this.props.orders;
            if (this.props.orders.isOrdersLoaded) {
                return (
                    <div className="container my-4">
                        <div className="row m-0">
                            <div className="col-lg-8 col-md-8 mx-auto my-2 py-4 bg-white rounded-lg shadow">
                                <h4 className="font-weight-bold">Pending Orders</h4>
                                <hr/>
                                {
                                orders.map(order => (
                                    <div className="bg-light" key={order._id}>
                                        {
                                            order.orderStatus === 'pending' ?
                                            <div className="card rounded-0 border-top-0 border-left-0 border-right-0 p-3 my-2">
                                                <h6 className="font-weight-bold">Order Info </h6>
                                                <p className="order-headings">Receipt : <span>{order.receipt}</span></p>
                                                <p className="order-headings">
                                                    Payment Type : <span>{order.payment_type}</span>
                                                </p>
                                                <p className="order-headings">Amount : <span>₹{order.amount}</span></p>
                                                <h6 className="font-weight-bold">Ordered Items </h6>
                                                <div className="table-responsive mt-2">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr className="table-headings">
                                                                <th>Name</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                            </tr>
                                                            {
                                                                order.items.map(item => (
                                                                    <tr className="orders-data" key={item._id}>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.price}</td>
                                                                        <td>{item.quantity}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                ))
                                }
                            </div>

                            <div className="col-lg-8 col-md-8 mx-auto my-2 py-4 bg-white rounded-lg shadow">
                                <h4 className="font-weight-bold">Delivered Orders</h4>
                                <hr/>
                                {
                                orders.map(order => (
                                    <div className="order-column" key={order._id}>
                                        {
                                            order.orderStatus !== 'completed' ?
                                                <div className="card rounded-0 border-top-0 border-left-0 border-right-0 p-3 my-2">
                                                <h6 className="font-weight-bold">Order Info </h6>
                                                <p className="order-headings">Receipt : <span>{order.receipt}</span></p>
                                                <p className="order-headings">
                                                    Payment Type : <span>{order.payment_type}</span>
                                                </p>
                                                <p className="order-headings">Amount : <span>₹{order.amount}</span></p>
                                                <h6 className="font-weight-bold">Ordered Items </h6>
                                                <div className="table-responsive mt-2">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr className="table-headings">
                                                                <th>Name</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                            </tr>
                                                            {
                                                                order.items.map(item => (
                                                                    <tr className="orders-data" key={item._id}>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.price}</td>
                                                                        <td>{item.quantity}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                )
            } else {
                if (this.props.orders.isOrdersLoading) {
                    return (
                        <PreLoader />
                    )
                } else {
                    this.props.getOrders();
                    return null;
                }
            }
        } else {
            return (
                <Redirect to='/login'/>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    orders: state.orders,
    auth: state.auth,
})

export default connect(mapStateToProps, {getOrders})(Orders);
