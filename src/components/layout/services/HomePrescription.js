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
      <div className="bg-white py-4">
        <h1 className="primary-heading text-center">Our Services</h1>
        <div className="row m-0 my-2">
          <div className="col-lg-4 text-center my-4">
            <h6 className="text-secondary font-weight-normal">Request a CallBack</h6>
            <Link to="/docConsult">
              <button type="button" class="btn-lg btn-primary">
                CallBack
              </button>{" "}
            </Link>
          </div>
          <div className="col-lg-4 text-center  my-4">
            <h6 className="text-secondary font-weight-normal">Have a prescription?</h6>
            <Link to="/prescription">
              <button type="button" class="btn-lg btn-primary">
                UPLOAD PRESCRIPTION
              </button>{" "}
            </Link>
          </div>
          <div className="col-lg-4 text-center  my-4">
            <h6 className="text-secondary font-weight-normal">Nursing Services Available</h6>
            <Link to="/docConsult">
              <button type="button" class="btn-lg btn-primary">
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
