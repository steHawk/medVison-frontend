import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from "../../actions/authActions";


class NavAuth extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="nav-auth">
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="#fff"
            >
              <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          {isAuthenticated ? (
            <li onClick={this.props.logout} className="log">
              <NavLink to="/">Log Out</NavLink>
            </li>
          ) : (
            <li className="log">
              <NavLink to="/login">Log In</NavLink>
            </li>
          )}

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="36"
              viewBox="0 0 24 24"
              width="36"
              fill="#fff"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <NavLink to="/cart">Cart</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavAuth);
