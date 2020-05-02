import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export class GetOtp extends Component {
  state = {
    username: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username } = this.state;
    return (
      <div className="">
        <div className="auth-form">
          <form onSubmit={this.onSubmit}>
            <div className="log-ele">
              <input
                type="text"
                className=""
                name="username"
                placeholder="Mobile Number"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="">
              <button type="submit" onSubmit={this.onSubmit}>Get OTP</button>
            </div>

            {(() => {
              if (this.props.history.location.pathname === "/register") {
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

export default GetOtp;
