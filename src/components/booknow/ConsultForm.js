import React, { Component } from "react";
import { callbackRequest } from "../../actions/doctorActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";//Link, 


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
      return <Redirect exact to="/confirmation" />;
    }
    return (
      <div className="container my-4">
        <div class="row m-0">
          <div className="col-lg-4 mx-auto bg-white p-4 shadow-lg rounded-lg">
            <h4 className="font-weight-bold">Request Callback</h4>

            <form onSubmit={this.onSubmit} className="consult-form">
              <div className="form-group">
                <label>
                  Name <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="userName"
                  onChange={this.onChange}
                  value={userName}
                />
                <label>
                  Mobile Number <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={this.onChange}
                  value={mobile}
                />
                <label>Medical Complaint</label>
                <textarea
                  className="form-control"
                  placeholder="What is your medical Complaint ?"
                  name="medicalComplaint"
                  onChange={this.onChange}
                  value={medicalComplaint}
                  style={{resize:"none"}}
                  rows="8"
                > </textarea>
              </div>
    
              <div className="text-right">
                <button type="submit" className="button-primary">Submit</button>
              </div>
              <div className="text-center my-2">
                <p className="font-weight-bold">Or Call Us On +91 9912654048</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  doctors: state.doctors.doctors,
  gotDocToken: state.doctors.gotDocToken,
});

export default connect(mapStateToProps, { callbackRequest })(ConsultForm);
