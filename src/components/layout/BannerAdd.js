import React, { Component } from "react";
import { Link } from "react-router-dom";

class BannerAdd extends Component {
  render() {
    return (
      <div className="m-0">
        <div id="offersBanner" className="carousel slide" data-ride="carousel" data-aos="fade-left" data-aos-duration="1200">
          <ol className="carousel-indicators">
            <li data-target="#offersBanner" data-slide-to="0" className="active"></li>
            <li data-target="#offersBanner" data-slide-to="1"></li>
            <li data-target="#offersBanner" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Link to="/super60">
                <img className="d-block w-100" src="/img/medBanner.png" alt="Super 60" />
              </Link>
            </div>
            <div className="carousel-item">
              <Link to="/super60">
                <img className="d-block w-100" src="/img/medBanner.png" alt="Super 60" />
              </Link>
            </div>
            <div className="carousel-item">
              <Link to="/super60">
                <img className="d-block w-100" src="/img/medBanner.png" alt="Super 60" />
              </Link>
            </div>
          </div>
          <a className="carousel-control-prev" href="#offersBanner" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#offersBanner" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
          {/* <Link to="/super60">
            <img src="/img/medBanner.png" alt="Super 60 Lab Tests" className="img-fluid" />{" "}
          </Link> */}

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
