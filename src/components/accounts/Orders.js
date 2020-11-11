import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOrders} from "../../actions/orderAction";

// import { Link } from "react-router-dom";


class Orders extends Component {
    render() {
        // console.log(this.props.orders.orders)
        let {orders} = this.props.orders;
        if (this.props.orders.isOrdersLoaded) {
            return (
                <div className="container">
                    <h2 className="font-weight-bold my-2">Pending Orders</h2>
                    <hr/>
                    {
                        orders.map(order => (
                            order.status === 'created' ?
                                <div key={order._id} className="col order">
                                    <div className="card items" style={{padding:"3%"}}>
                                        <p>Receipt: {order.receipt}</p>
                                        <p>Amount: {order.amount}</p>
                                        <p>Payment Type: {order.payment_type}</p>
                                    </div>
                                    <div className="row">
                                        {
                                            order.items.map(item=>(
                                                <div key={item._id} className="card shadow items">
                                                    <div className="card-body">
                                                        <p className="card-title font-weight-bold">Name: {item.name}</p>
                                                        <p className="mb-2">Price: {item.price}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <p>Type: {item.type}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                                : null
                        ))
                    }

                    <h2 className="font-weight-bold mt-4 mb-2">Delivered Orders</h2>
                    <hr/>
                    {
                        orders.map(order => (
                            order.status !== 'created' ?
                                <div key={order._id} className="col">
                                    <div className="card items" style={{padding:"3%"}}>
                                        <p>Receipt: {order.receipt}</p>
                                        <p>Amount: {order.amount}</p>
                                        <p>Payment Type: {order.payment_type}</p>
                                    </div>
                                    <div className="row">
                                        {
                                            order.items.map(item=>(
                                                <div key={item._id} className="card shadow">
                                                    <div className="card-body">
                                                        <p className="card-title font-weight-bold">Name: {item.name}</p>
                                                        <p className="mb-2">Price: {item.price}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <p>Type: {item.type}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                                : null
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
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders,
})

export default connect(mapStateToProps, {getOrders})(Orders);
