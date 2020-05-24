import React, { Component } from "react";
import { Link } from "react-router-dom";

class Specialist extends Component {
  render() {
    return (
      <div>
        <div className="specialist-head">
          <div className="special-des">
            <p>
              Doctor Consultation <strong>/ Dentistry</strong>
            </p>
          </div>

          <div className="special-select">
            <label htmlFor="specialists">Choose a specialist </label>

            <select id="specialists">
              <option value="dentistry">Dentistry</option>
              <option value="dentistry">Dentistry</option>
              <option value="dentistry">Dentistry</option>
              <option value="dentistry">Dentistry</option>
            </select>
          </div>
        </div>

        <div className="doc-div">
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

export default Specialist;
