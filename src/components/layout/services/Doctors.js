import React, { Component } from "react";
import { Link } from "react-router-dom";

class Doctors extends Component {
  render() {
    return (
      <div>
        <div className="docHead">
          <h3>Our Doctors</h3>
        </div>

        <div className="docSelect">
          <div className="callback">
            <Link to="/docConsult">
              <img src="/img/callback.jpg" alt="" />

              <div className="callbut">
                <p>Request Callback</p>
              </div>
            </Link>
          </div>

          <div className="doctors">
            <img src="/img/Dr_KranthiVerma.png" alt="" />
            <h1>Dr Kranthi Verma</h1>
            <p>MBBS, MD (DVL)</p>
            <strong>Dermatology</strong>
            <div>
              <div className="price_but">
                <p>₹500</p>
                <Link to="/">
                  <div className="docBut">
                    <p>Consult</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="doctors">
            <img src="/img/Dr_KranthiVerma.png" alt="" />
            <h1>Dr Kranthi Verma</h1>
            <p>MBBS, MD (DVL)</p>
            <strong>Dermatology</strong>
            <div>
              <div className="price_but">
                <p>₹500</p>
                <Link to="/">
                  <div className="docBut">
                    <p>Consult</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="doctors">
            <img src="/img/Dr_KranthiVerma.png" alt="" />
            <h1>Dr Kranthi Verma</h1>
            <p>MBBS, MD (DVL)</p>
            <strong>Dermatology</strong>
            <div>
              <div className="price_but">
                <p>₹500</p>
                <Link to="/">
                  <div className="docBut">
                    <p>Consult</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="doctors">
            <img src="/img/Dr_KranthiVerma.png" alt="" />
            <h1>Dr Kranthi Verma</h1>
            <p>MBBS, MD (DVL)</p>
            <strong>Dermatology</strong>
            <div>
              <div className="price_but">
                <p>₹500</p>
                <Link to="/">
                  <div className="docBut">
                    <p>Consult</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="doctors">
            <img src="/img/Dr_KranthiVerma.png" alt="" />
            <h1>Dr Kranthi Verma</h1>
            <p>MBBS, MD (DVL)</p>
            <strong>Dermatology</strong>
            <div>
              <div className="price_but">
                <p>₹500</p>
                <Link to="/">
                  <div className="docBut">
                    <p>Consult</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="doctors">
            <img src="/img/Dr_KranthiVerma.png" alt="" />
            <h1>Dr Kranthi Verma</h1>
            <p>MBBS, MD (DVL)</p>
            <strong>Dermatology</strong>
            <div>
              <div className="price_but">
                <p>₹500</p>
                <Link to="/">
                  <div className="docBut">
                    <p>Consult</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="doctors">
            <img src="/img/Dr_KranthiVerma.png" alt="" />
            <h1>Dr Kranthi Verma</h1>
            <p>MBBS, MD (DVL)</p>
            <strong>Dermatology</strong>
            <div>
              <div className="price_but">
                <p>₹500</p>
                <Link to="/">
                  <div className="docBut">
                    <p>Consult</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Doctors;
