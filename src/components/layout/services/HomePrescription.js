import React, { Component } from "react";
// import { fetchMedicineByType } from "../../../actions/medicineActions";

import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { addCart } from "../../../actions/cartAction";

class HomePrescription extends Component {
  // static propTypes = {
  //     fetchMedicineByType: PropTypes.func.isRequired,
  //     addCart: PropTypes.func.isRequired,

  // };

  render() {
    return (
      <div className="service-div my-2">
        <h4 className="font-weight-bold">Our Services</h4>
        <div className="upload-Home row m-0 my-2">
          <div className="upload-div col-lg-4 my-2">
            <h6>Request A CallBack</h6>
            <Link to="/docConsult">
              <button type="button" class="button-primary" icon="">
                Request A CallBack
              </button>{" "}
            </Link>
          </div>
          <div className="upload-div col-lg-4 my-2">
            <h6>Have a prescription?</h6>
            <Link to="/prescription">
              <button type="button" class="button-primary" icon="">
                UPLOAD PRESCRIPTION
              </button>{" "}
            </Link>
          </div>
          <div className="upload-div col-lg-4 my-2">
            <h6>Nursing Services Available</h6>
            <Link to="/docConsult">
              <button type="button" class="button-primary" icon="">
                Nursing Services
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(HomePrescription);
