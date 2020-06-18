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



  constructor(props) {
    super(props)
    this.state = {
      skip: 0,
      limit: 10
    };
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }


  increment() {
    this.setState({ skip: this.state.skip + 10, limit: this.state.limit + 10 });
    console.log(this.state);
    this.props.fetchMedicineByType(this.state.skip, this.state.limit);
  }


  decrement() {
    this.setState({ skip: this.state.skip - 10, limit: this.state.limit - 10 });
    console.log(this.state);
    this.props.fetchMedicineByType(this.state.skip, this.state.limit);
  }


  componentDidMount() {
    this.props.fetchMedicineByType(this.state.skip, this.state.limit);
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
        <div className="loadmore">
          <button onClick={this.decrement}>Previous</button>
          <button onClick={this.increment}>Next</button>
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
