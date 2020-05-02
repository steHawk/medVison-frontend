import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


export class Login extends Component {
  state = {
    username: '',
    password: '',
  };


  onSubmit = (e) => {
    e.preventDefault();
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
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

            <div className="log-ele">
              <input
                type="password"
                className=""
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
          
           <Link to="/register">Forgot Password?</Link>

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


export default Login;
