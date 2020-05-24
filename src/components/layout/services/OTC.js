import React, { Component } from "react";
import { Link } from "react-router-dom";


class OTC extends Component {
  render() {
    return (
      <div className="otc_div">
        <h1>Don’t have a Prescription?</h1>
        <div className="otc_search">
          <input type="text" placeholder="Search for Medicines" />
          <div className="search-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div className="med_type"> 
        <Link to="/meditems">
              <div className="docBut">
                <p>Antibiotics     <i className="fa fa-angle-right fa-inverse" aria-hidden="true"></i></p>
            
              </div>
            </Link>

            <Link to="/meditems">
              <div className="docBut">
                <p>Immunity boosters     <i className="fa fa-angle-right fa-inverse" aria-hidden="true"></i></p>
            
              </div>
            </Link>

            <Link to="/meditems">
              <div className="docBut">
                <p>Baby care    <i className="fa fa-angle-right fa-inverse" aria-hidden="true"></i></p>
            
              </div>
            </Link>

            <Link to="/meditems">
              <div className="docBut">
                <p>Over the counter (OTC)     <i className="fa fa-angle-right fa-inverse" aria-hidden="true"></i></p>
            
              </div>
            </Link>
        </div>
      </div>
    );
  }
}

export default OTC;
