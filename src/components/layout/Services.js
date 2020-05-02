import React from "react";
import { Link } from "react-router-dom";

function Service() {
  return (
    <div>
      <div className="service">
        <div className="inner_service">
          <div className="img_s">
            <img src="/img/checkup.jpg" alt="testing in lab"></img>
          </div>
          <div className="service_book">
            <p>Get Medical Test done simply at your Home</p>
            <Link to="/medtestform">Book Now</Link>
          </div>
        </div>
      </div>
      <div className="service">
        <div className="inner_service_odd">
          <div className="img_s">
            <img src="/img/doc.jpg" alt="testing in lab"></img>
          </div>
          <div className="service_book_odd">
            <p>Easy access to Doctor Consultation</p>
            <Link to="/docConsult">Book Now</Link>
          </div>
        </div>
      </div>
      <div className="service">
        <div className="inner_service">
          <div className="img_s">
            <img src="/img/meds.jpg" alt="lot of medicine"></img>
          </div>
          <div className="service_book">
            <p>Get Medicines & Medical Supplies Quick and Easy Delivery</p>
            <Link to="/medhome">Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
