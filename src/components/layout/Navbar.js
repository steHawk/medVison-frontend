import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavSearch from "./NavSearch";
import NavAuth from "./NavAuth";

class Navbar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="nav-item">
          <ul className="nav-left">
          <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/reports">Reports</NavLink>
            </li>
          </ul>
        </div>
        <NavSearch />
        <NavAuth />
      </div>
    );
  }
}

export default Navbar;
