import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';


export class Login extends Component {
  state = {
    number: '',
    password: '',
    msg: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.number, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value, msg: "" });

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
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { number, password } = this.state;
    return (
      <div className="auth-form">


        <h1>
          Login to eMetroPlus
        </h1>
        <form onSubmit={this.onSubmit}>
          <div className="log-ele">
            <input
              type="text"
              className=""
              name="number"
              placeholder="Mobile Number"
              onChange={this.onChange}
              value={number}
              pattern="\d{10}"
              onBlur={(e) => this.checkMobileNumber(e)}
            /><span id="msg">{this.state.msg}</span>
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

          <Link to="/otpLogin">Forgot Password?</Link>

          <div className="">
            <button className="authBut" type="submit">
              Login
              </button>
          </div>
          <p>
            Don't have an account? <Link className="relink" to="/getotp">Register</Link>
          </p>
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

