import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch.js";
import logo from "../../icon.png";
import Navbar from "./Navbar.js";


class Header extends Component {
  render() {
    function handleBlur(e) {
      console.log("hi");
      document.querySelector(".main-menu").classList.toggle("show");
    }
    return (
      <div className="appBar">
      <div className="headerNew">
         <Link className="" to="/">
              <img src={logo} alt="eMetroPlus" id="" />
            </Link>{" "}
            <Navbar />
            {/* <Link to="/prescription">
              <button className="">Upload Prescription</button>
            </Link> */}
            {/* <p className="">Call +91 991-654-056</p> */}
      </div>
      <div className="searchBar">
      <div onClick={handleBlur}>
              <div className="menu-btn" onClick={this.handleBlur}>
                <i className="fa fa-bars  fa-2x" aria-hidden="true"></i>
              </div>
            </div>
            <NavSearch />
      <Link to="/prescription">
              <button className="">Upload Prescription</button>
            </Link>
      </div>
      </div>
    );
  }
}

export default Header;
