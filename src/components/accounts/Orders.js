import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOrders} from "../../actions/orderAction";

// import { Link } from "react-router-dom";


class Orders extends Component {
    render() {
        console.log(this.props.orders)
        if (this.props.orders.isOrdersLoaded) {
            return (
                <div className="container my-4">
                    <h4 className="font-weight-bold my-2">Pending Orders</h4>
                    <hr/>
                    <div className="row m-0 my-2">
                        <div className="col-lg-4 col-md-6">
                            <div className="p-2">
                                {
                                    this.props.orders.orders.map((order, index) =>
                                        order.status === "created" ?
                                            <div key={index}>
                                                <div className="show-order-items" key={index}>
                                                    {order.items.map(item =>
                                                            <div className="card" key={item.id}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title font-weight-bold">{item.name}</h5>
                                                                    <h6 className="card-subtitle mb-2 text-muted">₹{item.price}</h6>
                                                                    <p className="card-text">{item.type}</p>
                                                                    <p className="card-text">Quantity: {item.quantity}</p>
                                                                    <p className="font-weight-bold">Status : <span
                                                                        className={order.status === "created" ? "text-muted" : "secondary-text"}>
                                                        {order.status === "created" ? "On the way" : "Delivered"}
                                                    </span></p>
                                                                </div>
                                                            </div>
                                                    )}
                                                </div>
                                                <p  style={{color: '#0000A0'}}>Amount : {order.amount}</p>
                                                <p style={{color: '#0000A0'}}>Receipt ID : {order.receipt}</p>
                                            </div>
                                            : null
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <h4 className="font-weight-bold mt-4 mb-2">Delivered Orders</h4>
                    <hr/>
                    <div className="row m-0 my-2">
                        <div className="col-lg-4 col-md-6">
                            <div className="p-2">
                                {
                                    this.props.orders.orders.map((order, index) =>
                                        order.status !== "created" ?
                                            <div key={index}>
                                                <div className="show-order-items" key={index}>
                                                    {order.items.map(item =>
                                                            <div className="card" key={item.id}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title font-weight-bold">{item.name}</h5>
                                                                    <h6 className="card-subtitle mb-2 text-muted">₹{item.price}</h6>
                                                                    <p className="card-text">{item.type}</p>
                                                                    <p className="card-text">Quantity: {item.quantity}</p>
                                                                    <p className="font-weight-bold">Status : <span
                                                                        className={order.status === "created" ? "text-muted" : "secondary-text"}>
                                                        {order.status === "created" ? "On the way" : "Delivered"}
                                                    </span></p>
                                                                </div>
                                                            </div>
                                                    )}
                                                </div>
                                                <p style={{color: 'green'}}>Amount : {order.amount}</p>
                                                <p style={{color: 'green'}}>Receipt ID : {order.receipt}</p>
                                            </div>
                                            : null
                                    )
                                }
                            </div>
                        </div>
                    </div>
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
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders,
})

export default connect(mapStateToProps, {getOrders})(Orders);
