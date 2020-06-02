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

          {this.props.doctors.map((doctor, index) => (
            <div key={index} className="doctors">
              <img src="/img/standing-11.png" alt="" />
              <h1>{doctor.userName}</h1>
              <p>MBBS, MD (DVL)</p>
              <strong>{doctor.specialization}</strong>
              <div>
                <div className="price_but">
                  <p>₹500</p>
                  {isAuthenticated ? (
                    <button
                      onClick={this.props.doctorConsultation.bind(
                        this,
                        doctor._id
                      )}
                      className="docBut"
                    >
                      <p>Consult</p>
                    </button>
                  ) : (
                    <Link to="/login">
                      <button className="docBut">
                        <p>Consult</p>
                      </button>
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
  doctors: state.doctors.doctors,
  auth: state.auth,
  gotDocToken: state.doctors.gotDocToken,
});
export default connect(mapStateToProps, {
  fetchAllDoctors,
  doctorConsultation,
})(Doctors);
