import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class Footer extends Component {
  render() {
    return (
      <div className="footer">
      <div className="inner_foot">
        <ul className="footer-col">
          <p>About Us</p>
          <li>
            <NavLink to="/accreditation">Accreditation</NavLink>
          </li>
          <li>
            <NavLink to="/awards">Awards and Accolades</NavLink>
          </li>
        </ul>
        <ul className="footer-col">
          <p>Services </p>
          <li>
            <NavLink to="/checkups">Health Checkups</NavLink>
          </li>
          <li>
            <NavLink to="/collection">Home Sample Collection</NavLink>
          </li>
        </ul>
        <ul className="footer-col">
          <p>Contact US </p>
          <li>
            <NavLink to="/">+91 9912589635</NavLink>
          </li>
          <li>
            <NavLink to="/">info@metrolabs.com</NavLink>
          </li>
        </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
