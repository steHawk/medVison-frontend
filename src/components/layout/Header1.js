import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch.js";
import logo from "../../icon.png";

class Header extends Component {
  render() {
    function handleBlur(e) {
      console.log("hi");
      document.querySelector(".main-menu").classList.toggle("show");
    }
    return (
      <div className="">
        <div className="">
          <div className="">
            <a className="" href="/">
              <img src={logo} alt="eMetroPlus" id="logo" />
            </a>{" "}
            <Link to="/prescription">
              <button className="upload">Upload Prescription</button>
            </Link>
            <p className="call">Call +91 991-654-056</p>
          </div>

          <div className="">
            <div onClick={handleBlur}>
              <div className="menu-btn" onClick={this.handleBlur}>
                <i className="fa fa-bars  fa-2x" aria-hidden="true"></i>
              </div>
            </div>
            <NavSearch />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
