import React, { Component } from "react";
// import { Link } from "react-router-dom";



class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choose: "login",
    };
  }
  active = (e) => {
    this.setState({ choose: e.target.value });
  };
  render() {

    return (
      <div>
        <div className="auth-login">
            Login to Medbaba
        </div>
      </div>
    );
  }
}

export default Auth;
