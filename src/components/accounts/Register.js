import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


export class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    number: ''
  };


  onSubmit = (e) => {
    e.preventDefault();
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password, email, number } = this.state;
    return (
      <div className="">
        <div className="auth-form">
          <form onSubmit={this.onSubmit}>
            <div className="log-ele">
            <label>Mobile Number</label>
              <input
                type="text"
                className=""
                name="number"
                placeholder="Mobile Number"
                onChange={this.onChange}
                value={number}
              />
            </div>

            <div className="log-ele">
            <label>Name <span>*</span></label>
              <input
                type="text"
                className=""
                placeholder="Name"
                name="name"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="log-ele">
            <label>Email</label>
              <input
                type="text"
                className=""
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>

            <div className="log-ele">
            <label>Password <span>*</span></label>
              <input
                type="password"
                className=""
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="">
              <button type="submit">
                Register
              </button>
            </div>
            <p>
              Have an account? <Link className="relink" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}


export default Register;
