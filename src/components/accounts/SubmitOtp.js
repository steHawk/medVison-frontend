import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {afterOTPLogin, getOtp, otpForLogin, validOtp} from "../../actions/authActions";

export class SubmitOtp extends Component {
    static propTypes = {
        state: PropTypes.object.isRequired
    };
    state = {
        mobileNumber: this.props.location.state.mobile === undefined ? "" : this.props.location.state.mobile,
        otp: "",
        verify: false,
        msg: "",
    };

    onSubmit = (e) => {
        e.preventDefault();
        let stateOtp = parseInt(this.state.otp);
        if (this.props.location.state.historyPath === "/otpLogin") {
            this.props.afterOTPLogin(this.state.mobileNumber, stateOtp)
        } else {
            this.props.validOtp(this.state.mobileNumber, stateOtp);

        }
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(e.target.value)
    };

    onClick = (e) => {
        e.preventDefault();
        if (this.props.location.state.historyPath === "/otpLogin") {
            this.props.otpForLogin(this.state.mobileNumber)
        } else {
            this.props.getOtp(this.state.mobileNumber);
        }
    };

    checkMobileNumber(e) {

        var keycode = (e.target.value.which) ? e.target.value.which : e.target.value.keyCode;
        //comparing pressed keycodes
        if (e.target.value.length !== 10) {
            this.setState({
                msg: "Invalid Mobile Number"
            })
            return false;
        }
        if (keycode > 31 && (keycode < 48 || keycode > 57)) {
            this.setState({
                msg: "Invalid Mobile Number"
            })
            return false;
        } else return true;
    }

    render() {
        if (this.props.location.state === undefined || this.props.location.state === "") {
            return (
                <Redirect to="/getotp"/>
            )
        }
        // console.log("this.props.state.auth.number", this.props);
        if (this.props.auth.isAuthenticated === true) {
            if (this.props.history.location.pathname === "/submitLoginOtp") {
                return <Redirect to="/"/>
            } else {
                return <Redirect to="/register"/>;
            }

        }
        const {mobileNumber, otp} = this.state;
        return (
            <div className="container my-4">

                <div className="col-lg-4 bg-white mx-auto p-4 shadow-lg rounded-lg">
                    <h3>
                        ENTER YOUR OTP
                    </h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="log-ele">
                            <label htmlFor="mobilenumber">
                                Mobile Number
                            </label>
                            <div className="row m-0">
                                <input
                                    id="mobilenumber"
                                    type="number"
                                    className="form-control"
                                    name="mobileNumber"
                                    placeholder="Mobile Number"
                                    onChange={this.onChange}
                                    value={mobileNumber}
                                    pattern="\d{10}"
                                    onBlur={(e) => this.checkMobileNumber(e)}
                                /><span id="msg">{this.state.msg}</span>

                            </div>
                        </div>


                        <div className="log-ele" style={{margin: "2em 0%"}}>
                            <label htmlFor="otp">OTP</label>
                            <div className="row m-0">
                                <input
                                    id="otp"
                                    type="number"
                                    className="form-control"
                                    placeholder="OTP"
                                    name="otp"
                                    onChange={this.onChange}
                                    value={otp}
                                />
                            </div>
                            <button style={{margin: "2em 6em"}} className="button-primary" type="submit">SUBMIT</button>
                            <button style={{margin: "2em 6em"}} className="button-primary" onClick={this.onClick}>Resend
                                OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state,
    auth: state.auth,
});

export default connect(mapStateToProps, {validOtp, afterOTPLogin, getOtp, otpForLogin})(SubmitOtp);