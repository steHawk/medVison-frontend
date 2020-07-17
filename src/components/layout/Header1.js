import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch.js";
import logo from "../../icon.png";

class Header1 extends Component {
  render() {
    function handleBlur(e) {
      console.log("hi");
      document.querySelector(".main-menu").classList.toggle("show");
    }
    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }
  
    return (
      <div className="">
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">
            &times;
          </a>
          <a href="#">Doctor Consultation</a>
          <a href="#">Lab Services</a>
          <a href="#">Medicines & Med Supplies</a>
        </div>

        <div class="topnav">
          <div class="nav-line-1">
            <div class="nav-left">
              <a href="javascript:void(0);" class="icon" onclick="openNav()">
                <i class="fa fa-bars"></i>
              </a>
              <Link to="/">
                {" "}
                <img src={logo} alt="eMetroPlus" id="logo" />{" "}
              </Link>
            </div>

            <div class="nav-right">
              <span>Hello, Sign in</span>
              <span>
                Cart<span class="fa fa fa-shopping-cart fa-1.5x"></span>
              </span>
            </div>
          </div>

          <div class="nav-line-2">
            <div class="search-container">
              <form action="/action_page.php">
                <input type="text" placeholder="Search.." name="search" />
                <button type="submit">
                  <i class="fa fa-search "></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header1;
