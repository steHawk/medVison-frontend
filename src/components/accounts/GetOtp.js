import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getOtp } from "../../actions/authActions";


export class GetOtp extends Component {
  state = {
    mobileNumber: "",
  };

  static propTypes = {
    getOtp: PropTypes.func.isRequired,
    otp: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
  };


  onChange = (e) => this.setState({ mobileNumber: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const mobileNumber = this.state.mobileNumber;
    this.props.getOtp(mobileNumber);
  };

  render() {
      const mobileNumber = this.state.mobileNumber;
      const { gotOtp } = this.props.auth;
   
    if (gotOtp) {
      return <Redirect to="/submitotp" />
    }
    return (
      <div className="">
        <div className="auth-form">
          <form onSubmit={this.onSubmit}>
            <div className="log-ele">
              <input
                type="number"
                className=""
                name="mobileName"
                placeholder="Mobile Number"
                onChange={this.onChange}
                value={mobileNumber}
              />
            </div>
            <div className="">
              <button type="submit" onSubmit={this.onSubmit}>
                Get OTP
              </button>
            </div>

            {(() => {
              if (this.props.history.location.pathname === "/getotp") {
    

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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  otp: state.auth.otp,
  auth: state.auth,
});

export default connect(mapStateToProps, { getOtp })(GetOtp);
