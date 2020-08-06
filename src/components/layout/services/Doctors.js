import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  fetchAllDoctors,
  doctorConsultation,
} from "../../../actions/doctorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Doctors extends Component {
  static propTypes = {
    doctorConsultation: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.fetchAllDoctors();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (this.props.gotDocToken) {
      return <Redirect exact to="/conformation" />;
    }
    return (
      <div className="my-4">
        <div className="container">
          <div className="docHead">
            <h4 className="font-weight-bold">Our Doctors</h4>
            <Link to="/docConsult" class="text-dark text-decoration-none">
              <i class="fa fa-phone" aria-hidden="true"></i> Request Callback
            </Link>
          </div>
          <hr />
          <div className="docSelect row m-0">
            {this.props.doctors.map((doctor, index) => (
              <div key={index} className="col-lg-3 col-md-4 my-2">
                <div className="p-2 shadow rounded">
                  <div className="text-center">
                    <img src="/img/standing-11.png" alt="" height="200px"/>
                  </div>
                  <div className="p-2">
                    <h5 className="primary-text font-weight-bold">{doctor.userName}</h5>
                    <p>MBBS, MD (DVL)</p>
                    <strong>{doctor.specialization}</strong>
                    <div>
                      <div className="price_but">
                        <p>₹500</p>
                        {isAuthenticated ? (
                          <div className="text-center">
                            <button
                              onClick={this.props.doctorConsultation.bind(
                                this,
                                doctor._id
                              )}
                              className="docBut"
                            >
                              <p>Consult</p>
                            </button>
                          </div>
                        ) : (
                          <Link to="/login">
                            <div className="text-center">
                              <button className="button-primary">
                                Consult
                              </button>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  doctors: state.doctors.doctors,
  auth: state.auth,
  gotDocToken: state.doctors.gotDocToken,
});
export default connect(mapStateToProps, {
  fetchAllDoctors,
  doctorConsultation,
})(Doctors);
