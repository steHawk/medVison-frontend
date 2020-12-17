import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import {connect} from 'react-redux';
import {afterOTPRegister, otpForRegister} from "../../actions/authActions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: "",
            msg: "",
            isOTPSent: false,
            otp: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.register = this.register.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        let {name: fieldName, value} = e.target;
        this.setState({
            [fieldName]: value,
            msg: "",
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let {mobileNumber} = this.state;

        if (mobileNumber && mobileNumber.length === 10) {
            this.props.otpForRegister(mobileNumber);
            this.setState({
                msg: "",
                isOTPSent: true,
            })
        } else {
            this.setState({
                msg: "Invalid Mobile Number"
            })
        }
    }

    register(e) {
        e.preventDefault();
        let {mobileNumber, otp} = this.state;
        console.log({mobileNumber, otp})
        if ((mobileNumber && mobileNumber.length === 10) && (otp && otp.length)) {
            this.props.afterOTPRegister(mobileNumber, otp)
        } else {
            this.setState({
                msg: "Invalid Details"
            })
        }
    }

    render() {
        let {mobileNumber, isOTPSent, msg, otp} = this.state;
        if (this.props.isAuthenticated) {
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div className="container my-4">
                <div className="row m-0">
                    <div className="col-lg-4 mx-auto bg-white p-4 shadow-lg rounded-lg">
                        <h4 className="font-weight-bold">Register</h4>
                        <hr/>
                        <label htmlFor="mobileNumber">
                            <h6 className="font-weight-bold">
                                Enter your 10 Digit Mobile Number{" "}
                            </h6>
                        </label>
                        <form onSubmit={this.onSubmit}>
                            <div className="log-ele">
                                <input
                                    id="mobileNumber"
                                    type="text"
                                    className="form-control"
                                    name="mobileNumber"
                                    placeholder="Mobile Number"
                                    onChange={(e) => this.onChange(e)}
                                    value={mobileNumber}
                                /><small id="msg" className="text-danger">{msg}</small>
                            </div>
                            {
                                isOTPSent ?
                                    null
                                    :
                                    <div className="text-center mb-2 mt-4">
                                        <button className="button-primary" type="submit"
                                                onSubmit={(e) => this.onSubmit(e)}>
                                            Get OTP
                                        </button>
                                    </div>
                            }
                        </form>
                        {
                            isOTPSent ?
                                <div className="mt-3">
                                    <label htmlFor="otp">
                                        <h6 className="font-weight-bold">
                                            Enter your OTP{" "}
                                        </h6>
                                    </label>
                                    <form onSubmit={(e) => this.register(e)}>
                                        <div className="log-ele">
                                            <input
                                                id="otp"
                                                type="number"
                                                className="form-control"
                                                name="otp"
                                                placeholder="OTP"
                                                onChange={(e) => this.onChange(e)}
                                                value={otp}
                                            /><small id="msg" className="text-danger">{msg}</small>
                                        </div>
                                        <div className="text-center mb-2 mt-4">
                                            <button className="button-primary" type="submit"
                                                    onSubmit={(e) => this.register(e)}>
                                                Register
                                            </button>
                                        </div>
                                        <hr />
                                        <div className="text-center mb-2 mt-4">
                                            <button className="button-secondary" onClick={(e) => this.onSubmit(e)}>
                                                Resend OTP
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                : null
                        }
                        <div className="text-center mb-2 mt-2">
                            <div>
                                <small>
                                    Already have an account? {" "}
                                    <Link
                                        to="/login"
                                        className="primary-text font-weight-bold text-decoration-none"
                                    >Login</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {otpForRegister, afterOTPRegister})(Login);