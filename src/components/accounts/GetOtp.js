import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from 'react-router-dom'
import {getOtp, otpForLogin} from "../../actions/authActions";


export class GetOtp extends Component {
    static propTypes = {
        getOtp: PropTypes.func.isRequired,
        // otp: PropTypes.string.isRequired,
        auth: PropTypes.object.isRequired
    };
    state = {
        mobileNumber: "",
        msg: "",
        otpSent: false,
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value, msg: ""});

    onSubmit = (e) => {
        e.preventDefault();
        const mobileNumber = this.state.mobileNumber;
        if (this.props.history.location.pathname === '/getotp') {
            this.props.getOtp(mobileNumber);
        } else {
            this.props.otpForLogin(mobileNumber);
        }
        this.setState({
            otpSent: true
        })
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
        console.log(this.props)
        if (this.state.otpSent === true) {
            return (
                <Redirect to={{
                    pathname: "/submitotp",
                    state: {mobile: this.state.mobileNumber, historyPath: this.props.history.location.pathname}
                }}/>
            )
        } else {
            return (
                <div className="container my-4">
                    <div className="row m-0">
                        <div className="col-lg-4 bg-white mx-auto p-4 shadow-lg rounded-lg">
                            <h4 className="font-weight-bold">
                                Enter your 10 Digit Mobile Number{" "}
                            </h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="log-ele">
                                    <label>
                                        Mobile Number
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        onChange={this.onChange}
                                        value={this.state.mobileNumber}
                                        pattern="\d{10}"
                                        onBlur={(e) => this.checkMobileNumber(e)}
                                    /><small id="msg" className="text-danger">{this.state.msg}</small>
                                </div>
                                <div className="text-center mb-2 mt-4">
                                    <button className="button-primary" type="submit" onSubmit={this.onSubmit}>
                                        Get OTP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

    }


    // render() {
    //   const mobileNumber = this.state.mobileNumber;
    //   const { gotOtp } = this.props.auth;otpForLogin

    //   if (gotOtp) {
    //     if (this.props.history.location.pathname === "/otpLogin") {
    //       return <Redirect to="/submitLoginOtp" />
    //     } else {
    //       return <Redirect to="/submitotp" />

    //     }
    //   }
    //   return (
    //     <div className="container my-4">
    //       <div class="row m-0">
    //         <div className="col-lg-4 bg-white mx-auto p-4 shadow-lg rounded-lg">
    //           {(() => {
    //             if (this.props.history.location.pathname === "/otpLogin") {
    //               return (
    //                 <h4 className="font-weight-bold">
    //                   Login with OTP {" "}
    //                 </h4>
    //               );
    //             } else {
    //               return (
    //                 <h4 className="font-weight-bold">
    //                   Enter your 10 Digit Mobile Number{" "}
    //                 </h4>
    //               );
    //             }
    //           })()}
    //           <form onSubmit={this.onSubmit}>
    //             <div className="log-ele">
    //               <label>
    //                 Mobile Number
    //               </label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 name="mobileName"
    //                 placeholder="Mobile Number"
    //                 onChange={this.onChange}
    //                 value={mobileNumber}
    //                 pattern="\d{10}"
    //                 onBlur={(e) => this.checkMobileNumber(e)}
    //               /><small id="msg" class="text-danger">{this.state.msg}</small>
    //             </div>
    //             <div className="text-center mb-2 mt-4">
    //               <button className="button-primary" type="submit" onSubmit={this.onSubmit}>
    //                 Get OTP
    //               </button>

    //               {(() => {
    //                 if (this.props.history.location.pathname === "/getotp") {
    //                   return (<p></p>)
    //                 } else {
    //                   return (
    //                     <div>
    //                       <small>
    //                         Don't have an account? <Link className="primary-text font-weight-bold text-decoration-none" to="/register">Register</Link>
    //                       </small>
    //                     </div>
    //                   );
    //                 }
    //               })()}
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
}

const mapStateToProps = (state) => ({
    // otp: state.auth.otp,
    auth: state.auth,
});

export default connect(mapStateToProps, {getOtp, otpForLogin})(GetOtp);
