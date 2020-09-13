import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer py-4">
        <div className="container text-md-left text-sm-left">
          <div className="row m-0">
            {/* <div className="col-lg-4 col-md-4">
              <h6 className="font-weight-bold text-uppercase">About Us</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/accreditation">Acceradation</Link>
                </li>
                <li>
                  <Link to="/awards">Awards and Accolades</Link>
                </li>
              </ul>
            </div> */}
            {/* <hr className="clearfix w-100 d-md-none" />
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
            <hr className="clearfix w-100 d-md-none" /> */}
            <div className="w-100 contact-us">
              <ul className="d-flex flex-wrap justify-content-between list-unstyled footer-contact-details my-0">
                <li className="my-2">
                  <Link 
                    to="docConsult"
                    >
                      Request Callback
                  </Link>
                </li>
                <li className="my-2">
                  <a href="tel:+91991-258-9635" className="text-mute text-decoration-none">+91 9912589635</a>
                </li>
                <li className="my-2">
                  <a href="mailto: info@metrolabs.com" className="text-mute text-decoration-none">info@metrolabs.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
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
