import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { validOtp } from "../../actions/authActions";

export class SubmitOtp extends Component {
  state = {
    mobileNumber: "",
    otp: "",
    verify: false,
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
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ mobileNumber: this.props.auth.number });
    }, 3000);
  }

  render() {
    if (this.state.verify === true) {
      return <Redirect to="/register" />;
    }
    const { mobileNumber, otp } = this.state;
    return (
      <div className="">
        <div className="auth-form">
          <form onSubmit={this.onSubmit}>
            <div className="log-ele">
              <input
                type="number"
                className=""
                name="mobileNumber"
                placeholder="Mobile Number"
                onChange={this.onChange}
                value={mobileNumber}
              />
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

            <Link to="/register">Resend OTP</Link>

            <div className="">
              <button type="submit">Login</button>
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

export default connect(mapStateToProps, { validOtp })(SubmitOtp);
