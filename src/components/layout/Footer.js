import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="footer py-4">
        <div className="container text-md-left text-sm-left">
          <div className="row m-0">
            <div className="col-lg-4 col-md-4">
              <h6 className="font-weight-bold text-uppercase">About Us</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/accreditation">Acceradation</Link>
                </li>
                <li>
                  <Link to="/awards">Awards and Accolades</Link>
                </li>
              </ul>
            </div>
            <hr className="clearfix w-100 d-md-none" />
            <div className="col-lg-4 col-md-4">
              <h6 className="font-weight-bold text-uppercase">Services</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/checkups">Health Checkups</Link>
                </li>
                <li>
                  <Link to="/collection">Home Sample collection</Link>
                </li>
              </ul>
            </div>
            <hr className="clearfix w-100 d-md-none" />
            <div className="col-lg-4 col-md-4 contact-us">
              <h6 className="font-weight-bold text-uppercase">Contact Us</h6>
              <ul className="list-unstyled footer-contact-details">
                <li>
                  <Link
                    to="tel:+91 9912589635"
                    className="text-mute text-decoration-none"
                  >
                    +91 9912589635
                  </Link>
                </li>
                <li>
                  <Link
                    to="mailto: info@metrolabs.com"
                    className="text-mute text-decoration-none"
                  >
                    info@metrolabs.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      // <div className="footer">
      // <div className="inner_foot">
      //   <ul className="footer-col">
      //     <p>About Us</p>
      //     <li>
      //       <NavLink to="/accreditation">Accreditation</NavLink>
      //     </li>
      //     <li>
      //       <NavLink to="/awards">Awards and Accolades</NavLink>
      //     </li>
      //   </ul>
      //   <ul className="footer-col">
      //     <p>Services </p>
      //     <li>
      //       <NavLink to="/checkups">Health Checkups</NavLink>
      //     </li>
      //     <li>
      //       <NavLink to="/collection">Home Sample Collection</NavLink>
      //     </li>
      //   </ul>
      //   <ul className="footer-col">
      //     <p>Contact US </p>
      //     <li>
      //       <NavLink to="/">+91 9912589635</NavLink>
      //     </li>
      //     <li>
      //       <NavLink to="/">info@metrolabs.com</NavLink>
      //     </li>
      //   </ul>
      //   </div>
      // </div>
    );
  }
}

export default Footer;
