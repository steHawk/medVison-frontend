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
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
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
      <div className="container my-4">
        <div className="meds">
          <h5 className="font-weight-bold ml-2">Prescription Medicine</h5>
          <div className="row m-0">
            {this.props.medicines.map((med, index) => (
              <div key={index} className="meditems col-lg-3 col-md-4 my-2">
                <div className="p-2 shadow rounded">
                  <div>
                    <Link  
                      to={{
                        pathname: "/to/item",
                        state: { items: med },
                      }}
                      className="text-decoration-none"
                    >
                      <h6 className="font-weight-bold primary-text">{med.doctorPrescriptionName}</h6>
                    </Link>
                    <strong>Description : </strong>
                    <p>{med.uses.replace(/(<([^>]+)>)/gi, "").slice(0, 52)}</p>
                    <strong>Package size : </strong> <p>{med.packSize}</p>
                  </div>
                  <div className="medBook">
                    <p>₹{med.mrp}</p>
                    {isAuthenticated ? (
                      <button
                        className="button-primary"
                        onClick={this.props.addCart.bind(
                          this,
                          med._id,
                          med.doctorPrescriptionName,
                          med.uses,
                          med.mrp,
                          med.packSize,
                          "Medicine"
                        )}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div className="text-right m-1">
                        <Link to="/login">
                          <button className="button-primary mb-0">Add to cart</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          <div className="text-center mt-4">
            <button onClick={this.decrement} className="button-primary mr-2">Previous</button>
            <button onClick={this.increment} className="button-primary ml-2">Next</button>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  medicines: state.medicine.meds,
  auth: state.auth,
});
export default connect(mapStateToProps, { fetchMedicineByType, addCart })(
  MedicineItems
);
