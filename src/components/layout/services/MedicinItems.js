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
    this.props.fetchMedicineByType("prescription medicines");
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="meds">
        <div className="filter_med">
          <button
            onClick={this.props.fetchMedicineByType.bind(
              this,
              "prescription medicines"
            )}
          >
            Prescription Medicines
          </button>
          <button
            onClick={this.props.fetchMedicineByType.bind(
              this,
              "over-the-counter"
            )}
          >
            Over-the-counter (OTC)
          </button>
          <button
            onClick={this.props.fetchMedicineByType.bind(this, "baby care")}
          >
            Baby Care
          </button>
          <button
            onClick={this.props.fetchMedicineByType.bind(this, "personal care")}
          >
            Personal Care
          </button>
          <button
            onClick={this.props.fetchMedicineByType.bind(this, "personal care")}
          >
            Supplements & Wellness Products
          </button>
          <button
            onClick={this.props.fetchMedicineByType.bind(
              this,
              "over-the-counter"
            )}
          >
            Medical & Surgical Devices
          </button>
          <button
            onClick={this.props.fetchMedicineByType.bind(
              this,
              "prescription medicines"
            )}
          >
            Immunity Boosters
          </button>
          <button
            onClick={this.props.fetchMedicineByType.bind(this, "baby care")}
          >
            Hand-Hygiene
          </button>
        </div>

        <div className="med_i">
          {this.props.medicines.map((med, index) => (
            <div key={index} className="meditems">
              <img src="/img/azy.jpg" alt="" />
              <div>
                <h1>{med.name}</h1>
                <strong>
                  Package size : <p>{med.packageSize}</p>
                </strong>
                <strong>
                  Description : <p>{med.description.slice(0, 60)}</p>
                </strong>
              </div>
              <div>
                <div >
                  <h2>{med.price}</h2>
                  {isAuthenticated ? (
                    <button className="addb"
                      onClick={this.props.addCart.bind(
                        this,
                        med._id,
                        med.name,
                        med.desc,
                        med.price,
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
