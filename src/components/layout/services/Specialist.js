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

       
      </div>
    );
  }
}

export default Specialist;
