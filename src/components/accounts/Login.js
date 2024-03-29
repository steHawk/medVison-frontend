// import React, {Component} from 'react';
// import {Redirect, Switch} from 'react-router-dom';
// import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {login, otpForLogin} from '../../actions/authActions';
// import PropTypes from 'prop-types'
//
//
// export class Login extends Component {
//     static propTypes = {
//         login: PropTypes.func.isRequired,
//         isAuthenticated: PropTypes.bool,
//     };
//     state = {
//         mobileNumber: '',
//         password: '',
//         msg: '',
//     };
//
//     onSubmit = (e) => {
//         e.preventDefault();
//         let {mobileNumber} = this.state;
//         this.props.otpForLogin(mobileNumber);
//     };
//
//     onChange = (e) => this.setState({[e.target.name]: e.target.value, msg: ""});
//
//     checkMobileNumber(e) {
//         var keycode = (e.target.value.which) ? e.target.value.which : e.target.value.keyCode;
//         //comparing pressed keycodes
//         if (e.target.value.length !== 10) {
//             this.setState({
//                 msg: "Invalid Mobile Number"
//             })
//             return false;
//         }
//         if (keycode > 31 && (keycode < 48 || keycode > 57)) {
//             this.setState({
//                 msg: "Invalid Mobile Number"
//             })
//             return false;
//         } else return true;
//     }
//
//     render() {
//         if (this.props.isAuthenticated) {
//             return <Switch>
//                 <Redirect to="/"/>
//             </Switch>;
//         }
//         return (
//             <div className="container my-4">
//                 <div className="row m-0">
//                     <div className="col-lg-4 mx-auto bg-white p-4 shadow-lg rounded-lg">
//                         <h4 className="font-weight-bold">
//                             Enter your 10 Digit Mobile Number{" "}
//                         </h4>
//                         <form onSubmit={this.onSubmit}>
//                             <div className="log-ele">
//                                 <label>
//                                     Mobile Number
//                                 </label>
//                                 <input
//                                     type="number"
//                                     className="form-control"
//                                     name="mobileNumber"
//                                     placeholder="Mobile Number"
//                                     onChange={this.onChange}
//                                     value={this.state.mobileNumber}
//                                     onBlur={(e) => this.checkMobileNumber(e)}
//                                 /><small id="msg" className="text-danger">{this.state.msg}</small>
//                             </div>
//                             <div className="text-center mb-2 mt-4">
//                                 <button className="button-primary" type="submit" onSubmit={this.onSubmit}>
//                                     Get OTP
//                                 </button>
//                             </div>
//                             <div className="text-center mb-2 mt-4">
//                                 <div>
//                                     <small>
//                                         Don't have an account? <Link
//                                         className="primary-text font-weight-bold text-decoration-none"
//                                         to="/getotp">Register</Link>
//                                     </small>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated,
// });
//
// export default connect(mapStateToProps, {login, otpForLogin})(Login);
//
//

import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import {connect} from 'react-redux';
import {afterOTPLogin, otpForLogin} from "../../actions/authActions";

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
        this.login = this.login.bind(this);
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
        console.log(this.state)

        if (mobileNumber && mobileNumber.length === 10) {
            this.props.otpForLogin(mobileNumber);
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

    login(e) {
        e.preventDefault();
        let {mobileNumber, otp} = this.state;
        this.props.afterOTPLogin(mobileNumber, otp)
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
                        <h4 className="font-weight-bold">Login</h4>
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
                                    <form onSubmit={(e) => this.login(e)}>
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
                                                    onSubmit={(e) => this.login(e)}>
                                                LOGIN
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
                                    Don't have an account? {" "}
                                    <Link
                                        to="/register"
                                        className="primary-text font-weight-bold text-decoration-none"
                                    >Register</Link>
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

export default connect(mapStateToProps, {otpForLogin, afterOTPLogin})(Login);