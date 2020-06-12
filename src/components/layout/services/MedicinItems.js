import React, { Component } from "react";
import { fetchMedicineByType } from "../../../actions/medicineActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addCart } from "../../../actions/cartAction";




class MedicineItems extends Component {
  static propTypes = {
    fetchMedicineByType: PropTypes.func.isRequired,
    addCart: PropTypes.func.isRequired,

  };

  componentDidMount() {
    this.props.fetchMedicineByType();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    return (


      <div className="meds">

        <h3>Prescription Medicine</h3>

        <div className="med_i">
          {this.props.medicines.map((med, index) => (


            <div key={index} className="meditems">
              <div>
                <h3>{med.doctorPrescriptionName}</h3>
                <strong>
                  Description :  </strong><p>{med.uses.replace(/(<([^>]+)>)/ig, "").slice(0, 52)}</p>

                <strong>
                  Package size : </strong> <p>{med.packSize}</p>

              </div>
              <div>
                <div className="medBook">
                  <p>₹{med.mrp}</p>
                  {isAuthenticated ? (
                    <button className="addb"
                      onClick={this.props.addCart.bind(
                        this,
                        med._id,
                        med.doctorPrescriptionName,
                        med.uses,
                        med.mrp,
                        "Medicine"
                      )}
                    >
                      Add to cart
                    </button>
                  ) : (
                      <Link to="/login">
                        <button className="addb">Add to cart</button>
                      </Link>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  medicines: state.medicine.meds,
  auth: state.auth,
});
export default connect(mapStateToProps, { fetchMedicineByType, addCart })(MedicineItems);
