import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getOtp, otpForLogin } from "../../actions/authActions";


export class GetOtp extends Component {
  state = {
    mobileNumber: "",
    msg:"",
  };

  static propTypes = {
    getOtp: PropTypes.func.isRequired,
    otp: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
  };


  onChange = (e) => this.setState({ mobileNumber: e.target.value, msg:"" });

  onSubmit = (e) => {
    e.preventDefault();
    const mobileNumber = this.state.mobileNumber;
    if (this.props.history.location.pathname === "/otpLogin") {
    this.props.otpForLogin(mobileNumber);
    }else{
      this.props.getOtp(mobileNumber);
    }
  };

  
  checkMobileNumber(e) {

    var keycode = (e.target.value.which) ? e.target.value.which : e.target.value.keyCode;
    //comparing pressed keycodes
    if(e.target.value.length !== 10){
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
    }
    else return true;
  }

  render() {
    const mobileNumber = this.state.mobileNumber;
    const { gotOtp } = this.props.auth;

    if (gotOtp) {
      if (this.props.history.location.pathname === "/otpLogin") {
        return <Redirect to="/submitLoginOtp" />
      } else {
        return <Redirect to="/submitotp" />

      }
    }
    return (
 
        <div className="auth-form">
 
        {(() => {
          if (this.props.history.location.pathname === "/otpLogin") {
            return (
              <h1>
                LOGIN WITH OTP {" "}
              </h1>
            );
          } else {
            return (
              <h1>
                ENTER YOUR MOBILE 10 DIGIT NUMBER{" "}
                </h1>
            );
          }
        })()}
          <form onSubmit={this.onSubmit}>

            <div className="log-ele">
              <input
                type="text"
                className=""
                name="mobileName"
                placeholder="Mobile Number"
                onChange={this.onChange}
                value={mobileNumber}
                pattern="\d{10}"
                onBlur={(e) => this.checkMobileNumber(e)}
              /><span id="msg">{this.state.msg}</span>
            </div>
            <div className="">
                  <button className="authBut" type="submit" onSubmit={this.onSubmit}>
                    Get OTP
                       </button>
                </div>

            {(() => {
              if (this.props.history.location.pathname === "/getotp") {

                return (<p></p>)

              } else {
                return (
            
                    <p>
                      Don't have an account?{" "}
                      <Link className="relink" to="/register">
                        Register
                    </Link>
                    </p>
                );
              }
            })()}
          </form>
        </div>

    );
  }
}

const mapStateToProps = (state) => ({
  otp: state.auth.otp,
  auth: state.auth,
});

export default connect(mapStateToProps, { getOtp, otpForLogin })(GetOtp);
