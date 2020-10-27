import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class TopBar extends Component {
    render() {
        return (
            <div className="contact-topbar text-light p-2">
                <div className="row m-0">
                    <div className="col-lg-6 col-md-6">
                        <p className="m-0"><small>Call: <a href="tel:+91 9912589635" className="text-light">+91 9912589635</a></small></p>
                    </div>
                    <div className="col-lg-6 col-md-6 text-right">
                        <Link to="/login" className="text-light px-2 border-right"><small>Login</small></Link>
                        <Link to="/getotp" className="text-light px-2 border-right"><small>Register</small></Link>
                        <small className="px-2">Mail us at <a href="info@metrolabs.com" className="text-light">info@metrolabs.com</a></small>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar
