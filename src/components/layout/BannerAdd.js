import React, { Component } from "react";
import { Link } from "react-router-dom";

class BannerAdd extends Component {
  render() {
    return (
      <div className="my-4">
          <Link to="/super60">
            <img src="/img/medBanner.png" alt="Super 60 Lab Tests" className="img-fluid" />{" "}
          </Link>

          {/* <div>
            <h2>eMetroPlus is one stope solution to all your medical needs.</h2>
            <p>Call us on +91 969-685-696 or Request a call back</p>
            <Link to="/docConsult" className="btn">
              Request Callback <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </div> */}
      </div>
    );
  }
}
export default BannerAdd;
