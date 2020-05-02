import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


export class SubmitOtp extends Component {
  state = {
    mobileNumber: 9912654045,
    otp: '',
  };


  onSubmit = (e) => {
    e.preventDefault();
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { mobileNumber, otp } = this.state;
    return (
      <div className="">
        <div className="auth-form">
          <form onSubmit={this.onSubmit}>
            <div className="log-ele">
              <input
                type="text"
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
              <button type="submit">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link className="relink" to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}


export default SubmitOtp;
