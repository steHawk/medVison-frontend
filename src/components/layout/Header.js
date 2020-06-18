import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import NavSearch from "./NavSearch";


class Header extends Component {

  render() {
    function handleBlur(e) {
      console.log("hi");
      document.querySelector('.main-menu').classList.toggle('show');
    }
    return (

      <div class="navbar-top">

        <a class="logo" href="/">
          <p>eMetroPlus</p>
        </a>


        <div class="menu-search">
        <div onClick={handleBlur}>
          <div class="menu-btn"  onClick={this.handleBlur}>
            <i class="fa fa-bars  fa-2x" aria-hidden="true"></i>
          </div>
          </div>

          <div class="search">
            <input type="text" placeholder="Search for test,medicine,doctor." />
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>


        </div>

        <Link to="/prescription"><button class="upload">Upload Prescription</button></Link>

        

        <p class="call">Call +91 991-654-056</p>

      </div>
       
    );
  }
}

export default Header;
