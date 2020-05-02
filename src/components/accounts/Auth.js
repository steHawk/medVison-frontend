import React, { Component } from "react";

class Auth extends Component {
  render() {
    return <div>
      <div className="auth-opt">
          <button className="active-but">Password</button>
          <button className="inactive-but">OTP</button>
      </div>
    </div>;
  }
}

export default Auth;
