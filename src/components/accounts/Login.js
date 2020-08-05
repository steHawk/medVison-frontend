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
      <div className="container my-4">
        <div class="row m-0">
          <div className="col-lg-4 mx-auto p-4 shadow-lg rounded">
            <h4 className="font-weight-bold">
              Login to eMetroPlus
            </h4>
            <div className="form-group">
              <form onSubmit={this.onSubmit} className="form">
                  <label>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="number"
                    placeholder="Mobile Number"
                    onChange={this.onChange}
                    value={number}
                    pattern="\d{10}"
                    onBlur={(e) => this.checkMobileNumber(e)}
                  />
                  <span id="msg">{this.state.msg}</span>

                  <label>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                  />
                  <Link to="/otpLogin" className="primary-text font-weight-bold text-decoration-none"><small>Forgot Password?</small></Link>
                  <div className="text-center my-2">
                    <button className="button-primary" type="submit">
                      Login
                    </button>
                    <div>
                      <small>
                        Don't have an account? <Link className="primary-text font-weight-bold text-decoration-none" to="/getotp">Register</Link>
                      </small>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

