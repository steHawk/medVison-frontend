import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types'


export class Register extends Component {
  state = {
    userName: '',
    password: '',
    email: '',
    number: ''
  };
  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };


  componentDidMount() {
      this.setState({ number: this.props.auth.number });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {number, userName, password, email  } = this.state;
    const newUser = {
      number,
      userName,
      password,
      email,
    };
    this.props.register(newUser);
    console.log(newUser)
  };



  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect exact to="/" />;
    }
    const {number, userName, password, email  } = this.state;
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
                name="userName"
                onChange={this.onChange}
                value={userName}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
