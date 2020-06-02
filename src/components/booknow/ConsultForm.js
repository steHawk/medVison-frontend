import React, { Component } from "react";
import { callbackRequest } from "../../actions/doctorActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";


class ConsultForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      mobile: "",
      medicalComplaint: "",
    };
  }

  static propTypes = {
    callbackRequest: PropTypes.func.isRequired,
    gotDocToken: PropTypes.bool,

  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { userName, mobile, medicalComplaint } = this.state;

    const newCallBack = {
      userName,
      mobile,
      medicalComplaint,
    };
    this.props.callbackRequest(newCallBack);
    console.log(newCallBack);
  };

  render() {
    console.log(this.state);
    const { userName, mobile, medicalComplaint } = this.state;
    if (this.props.gotDocToken) {
      return <Redirect exact to="/conformation" />;
    }
    return (
      <div className="call_back">
        <h2>Request Callback</h2>

        <form onSubmit={this.onSubmit}>
          <div className="call-ele">
            <label>
              Name <span>*</span>
            </label>
            <input
              type="text"
              className=""
              placeholder="Name"
              name="userName"
              onChange={this.onChange}
              value={userName}
            />
          </div>

          <div className="call-ele">
            <label>
              Mobile Number <span>*</span>
            </label>
            <input
              type="text"
              className=""
              name="mobile"
              placeholder="Mobile Number"
              onChange={this.onChange}
              value={mobile}
            />
          </div>

          <div className="call-ele">
            <label>Medical Complaint</label>
            <input
              type="text area"
              className=""
              placeholder="What is your medical Complaint ?"
              name="medicalComplaint"
              onChange={this.onChange}
              value={medicalComplaint}
            />
          </div>
 
          <div className="">
            <button type="submit">Submit</button>
          </div>
 
          <p>Or Call Us On +91 9912654048</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  doctors: state.doctors.doctors,
  gotDocToken: state.doctors.gotDocToken,
});

export default connect(mapStateToProps, { callbackRequest })(ConsultForm);
