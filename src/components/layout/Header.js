import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class Header extends Component {
  render() {
    return (
      <div className="navbar-top">
        <NavLink to="/">
          {" "}
          <h1>MedBaba</h1>
        </NavLink>

        <div className="store-img">
          <h3>Download Our App</h3>
          <img src="/img/downloadA.png" alt="apple store"></img>
          <img src="/img/download.png" alt="apple store"></img>
        </div>
      </div>
    );
  } 
}

export default Header;
