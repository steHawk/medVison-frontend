import React, { Component } from "react";
import { Link } from "react-router-dom";



class Doctors extends Component {
  render() {
    return (
      <div>
        <div className="docHead">
          <h3>Choose your doctor</h3>
        </div>

        <div className="docSelect">

          <div className="docSelect1">
            <img src="/img/callback.jpg" alt="" />
            <Link to="/docConsult">
              <div className="docBut">
                <p>Request Callback</p>
              </div>
            </Link>
          </div>

          <div className="docSelect1">
            <img src="/img/Dermitology.png" alt="" />
            <Link to="/specialist">
              <div className="docBut">
                <p>Dermatology</p>
              </div>
            </Link>
          </div>

          <div className="docSelect1">
            <img src="/img/callback.jpg" alt="" />
            <Link to="/">
              <div className="docBut">
                <p>Request Callback</p>
              </div>
            </Link>
          </div>


          <div className="docSelect1">
            <img src="/img/callback.jpg" alt="" />
            <Link to="/">
              <div className="docBut">
                <p>Request Callback</p>
              </div>
            </Link>
          </div>


          <div className="docSelect1">
            <img src="/img/callback.jpg" alt="" />
            <Link to="/">
              <div className="docBut">
                <p>Request Callback</p>
              </div>
            </Link>
          </div>

          <div className="docSelect1">
            <img src="/img/callback.jpg" alt="" />
            <Link to="/">
              <div className="docBut">
                <p>Request Callback</p>
              </div>
            </Link>
          </div>

        </div>


      </div>
    );
  }
}

export default Doctors;
