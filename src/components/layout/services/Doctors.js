import React, {Component} from "react";
import {Link} from "react-router-dom";
import {doctorConsultation, fetchAllDoctors, resetConsultToken} from "../../../actions/doctorActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class Doctors extends Component {
    static propTypes = {
        doctorConsultation: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            docTokenNumber: ""
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        if (this.props.gotDocToken) {
            //
        }
        return (
            <div className="my-4">
                <div className="container">
                    <div className="docHead">
                        <h5 className="font-weight-bold primary-heading">Our Doctors</h5>
                        <Link to="/docConsult" className="text-secondary text-decoration-none">
                            <i className="fa fa-phone mr-1" aria-hidden="true"></i> Request Callback
                        </Link>
                    </div>
                    <hr/>
                    <div className="docSelect row m-0">
                        {this.props.doctors.doctors.map((doctor, index) => (
                            <div key={index} className="col-lg-3 col-md-6">
                                <div className="p-2 my-2">
                                    <div className="card rounded-lg shadow" style={{width: "auto"}}
                                         data-aos="fade-up" data-aos-duration="1200">
                                        <div className="text-center">
                                            <img src="/img/standing-11.png" alt="" height="150px"/>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="primary-text font-weight-bold">{doctor.userName}</h6>
                                            <p>MBBS, MD (DVL)</p>
                                            <strong>{doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1)}</strong>
                                            <p>₹500</p>
                                            {isAuthenticated ? (
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        data-toggle="modal"
                                                        data-target="#Confirmed"
                                                        onClick={this.props.doctorConsultation.bind(
                                                            this,
                                                            doctor._id
                                                        )}
                                                        className="button-primary"
                                                    >
                                                        Consult
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
                        ))}
                    </div>
                </div>

                {/* POP UP - DISPLAYS WHEN CLICKED */}
                <div className="modal fade" id="Confirmed" tabIndex="-1" role="dialog" aria-labelledby="ConfirmedTitle"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title font-weight-bold" id="Confirmed">Doctor Consulation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="secondary-text">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6 className="font-weight-bold">
                                    Confirmation ID : {" "}
                                    <span className="font-weight-bold text-primary">{this.props.doctors.doc_token}</span> 
                                </h6>
                                <p>Our Customer Support will contact you in 3 working hours
                                </p>
                                <h6>Thank you!</h6>
                            </div>
                            <div className="modal-footer border-top-0">
                                <button type="button" className="button-secondary" data-dismiss="modal"
                                        onClick={this.props.resetConsultToken}>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    doctors: state.doctors,
    auth: state.auth,
    gotDocToken: state.doctors.gotDocToken,
});
export default connect(mapStateToProps, {
    fetchAllDoctors,
    doctorConsultation,
    resetConsultToken,
})(Doctors);
