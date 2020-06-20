import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { validOtp, afterOTPLogin ,  getOtp, otpForLogin } from "../../actions/authActions";

export class SubmitOtp extends Component {
  state = {
    mobileNumber: "",
    otp: "",
    verify: false,
    msg:"",
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    validOtp: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    let stateOtp = parseInt(this.state.otp);
    let propOtp = this.props.auth.otp;
    if (stateOtp === propOtp) {
      this.setState({ verify: true });
    } else {
      this.props.validOtp();
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, msg:"" });
  };

  onClick = (e) => {
    e.preventDefault();
    if (this.props.history.location.pathname === "/submitLoginOtp") {
      this.props.otpForLogin(this.state.mobileNumber);
      return <Redirect to="/" />
    } else {
      this.props.getOtp(this.state.mobileNumber);
    }
   
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ mobileNumber: this.props.auth.number });
    }, 3000);
  }

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
    if (this.state.verify === true) {
      if (this.props.history.location.pathname === "/submitLoginOtp") {
        this.props.afterOTPLogin(this.props.auth.number);
        return <Redirect to="/" />
      } else {
        return <Redirect to="/register" />;
      }
     
    }
    const { mobileNumber, otp } = this.state;
    return (
      <div className="">

        <div className="auth-form">
        <h1>
         ENTER YOUR OTP
        </h1>
          <form onSubmit={this.onSubmit}>
            <div className="log-ele">
              <input
                type="text"
                className=""
                name="mobileNumber"
                placeholder="Mobile Number"
                onChange={this.onChange}
                value={mobileNumber}
                pattern="\d{10}"
                onBlur={(e) => this.checkMobileNumber(e)}
              /><span id="msg">{this.state.msg}</span>
              
            </div>

            <div className="log-ele">
              <input
                type="password"
                className=""
                placeholder="OTP"
                name="otp"
                onChange={this.onChange}
                value={otp}
              />
            </div>

            <button className="resendOtp" onClick={this.onClick}>Resend OTP</button>

            <div >
              <button className="authBut" type="submit">SUBMIT</button>
            </div>
            <p>
              Don't have an account?{" "}
              <Link className="relink" to="/getotp">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { validOtp, afterOTPLogin, getOtp, otpForLogin })(SubmitOtp);
