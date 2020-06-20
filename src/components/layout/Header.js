import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavSearch } from "./NavSearch.js";
import logo from "../../icon.png";

class Header extends Component {

  render() {
    // function handleBlur(e) {
    //   console.log("hi");
    //   document.querySelector('.main-menu').classList.toggle('show');
    // }
    return (

      <div className="navbar-top">

        <a className="logo" href="/">
          <img src={logo} alt="eMetroPlus" id="logo"/>
        </a>


        {/* <div className="menu-search">
          <div onClick={handleBlur}>
            <div className="menu-btn" onClick={this.handleBlur}>
              <i className="fa fa-bars  fa-2x" aria-hidden="true"></i>
            </div>
          </div> */}

        <NavSearch />
        <Link to="/prescription"><button className="upload">Upload Prescription</button></Link>

        <p className="call">Call +91 991-654-056</p>
      </div>



      // </div>

    );
  }
}

export default Header;
