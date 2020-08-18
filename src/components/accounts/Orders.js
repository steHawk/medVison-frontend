import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Orders extends Component {
    render() {
        return (
            <div className="container my-4">
                <h4 className="font-weight-bold my-2">Pending Orders</h4>
                <hr />
                <div className="row m-0 my-2">
                    <div className="col-lg-4 col-md-6">
                        <div className="p-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold">ACIVIR EYE DROP</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">₹55.5</h6>
                                    <p className="card-text">Acyclovir is used in the treatment of viral infectio</p>
                                    <p className="font-weight-bold">Status : <span className="text-muted">On the way</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="p-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold">ALGIC EYE DROP</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">₹44.7</h6>
                                    <p className="card-text">Ketorolac is used for pain relief, it relieves pain</p>
                                    <p className="font-weight-bold">Status : <span className="secondary-text">Dispatched</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 className="font-weight-bold mt-4 mb-2">Delivered Orders</h4>
                <hr />
                <div className="row m-0 my-2">
                    <div className="col-lg-4 col-md-6">
                        <div className="p-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold">ALERCHEK OD NA EYE DROP</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">₹107.4</h6>
                                    <p className="card-text">Olopatadine is used to treat allergic disorders.</p>
                                    <p className="font-weight-bold">Status : <span className="text-success">Delivered</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders
