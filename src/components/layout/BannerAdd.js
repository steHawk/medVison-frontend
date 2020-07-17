import React, { Component } from "react";
import { Link } from "react-router-dom";

class BannerAdd extends Component {
  render() {
    return (
      <div>
        <div className="bannerImg">
          <Link to="/super60">
            <img src="/img/medBanner.png" alt="Banner Add" />{" "}
          </Link>

          {/* <div>
            <h2>eMetroPlus is one stope solution to all your medical needs.</h2>
            <p>Call us on +91 969-685-696 or Request a call back</p>
            <Link to="/docConsult" className="btn">
              Request Callback <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </div> */}
        </div>
      </div>
    );
  }
}
export default BannerAdd;
