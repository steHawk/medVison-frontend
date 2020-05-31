import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavSearch from "./NavSearch";
import NavAuth from "./NavAuth";

class Navbar extends Component {
  render() {
    function handleBlur(e) {
      console.log("hi");
      document.querySelector(".nav-item").classList.toggle("show");
    }

    return (
      <div className="nav-bar">
        <div onClick={handleBlur} className="menu-btn">
          <i className="fa fa-bars  fa-2x" aria-hidden="true"></i>
        </div>

        <div className="nav-item fa-2x">
        <div onClick={handleBlur} className="menu-btn close">
          <i className="fa fa-times " aria-hidden="true"></i>
        </div>
          <ul className="nav-left">
            <li className="fix">
              <NavLink to="/">Home</NavLink>
            </li>
         
            <li className="fix">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className="fix">
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li className="fix-1">
              <div className="dropdown">
                <button className="dropbtn">
                  Services
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <NavLink to="/doctors">Doctor Consultation</NavLink>
                  <NavLink to="/alltests">Lab Services</NavLink>
                  <NavLink to="/medicine">
                    Medicines and Medical Supplies
                  </NavLink>
                </div>
              </div>
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
