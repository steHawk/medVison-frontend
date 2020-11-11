import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOrders} from "../../actions/orderAction";

import {Redirect} from "react-router-dom";


class Orders extends Component {
    render() {
        if (this.props.auth.isAuthenticated) {
            let {orders} = this.props.orders;
            if (this.props.orders.isOrdersLoaded) {
                return (
                    <div className="container">
                        <h2 className="font-weight-bold my-2">Pending Orders</h2>
                        <hr/>
                        {
                            orders.map(order => (
                                <div className="order-column" key={order._id}>
                                    {
                                        order.status === 'created' ?
                                            <div className="order-column card">
                                                <p className="order-headings">Receipt: <span>{order.receipt}</span></p>
                                                <p className="order-headings">
                                                    Payment Type: <span>{order.payment_type}</span>
                                                </p>
                                                <p className="order-headings">Amount: <span>{order.amount}</span></p>
                                                <hr />
                                                <div className="order-headings">
                                                    <p className="order-headings">Ordered: </p>
                                                </div>
                                                <table border={1} className="orders-table">
                                                    <tbody>
                                                    <tr className="table-headings">
                                                        <td>Name</td>
                                                        <td>Price</td>
                                                        <td>Quantity</td>
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
                                            : null
                                    }
                                </div>
                            ))
                        }

                        <h2 className="font-weight-bold mt-4 mb-2">Delivered Orders</h2>
                        <hr/>
                        {
                            orders.map(order => (
                                <div className="order-column" key={order._id}>
                                    {
                                        order.status !== 'created' ?
                                            <div className="order-column card">
                                                <p className="order-headings">Receipt: <span>{order.receipt}</span></p>
                                                <p className="order-headings">
                                                    Payment Type: <span>{order.payment_type}</span>
                                                </p>
                                                <p className="order-headings">Amount: <span>{order.amount}</span></p>
                                                <hr />
                                                <div className="order-headings">
                                                    <p className="order-headings">Ordered: </p>
                                                </div>
                                                <table border={1} className="orders-table">
                                                    <tbody>
                                                    <tr className="table-headings">
                                                        <td>Name</td>
                                                        <td>Price</td>
                                                        <td>Quantity</td>
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
                                            : null
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            } else {
                if (this.props.orders.isOrdersLoading) {
                    return (
                        <div className="loading">
                            Loading...
                        </div>
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
