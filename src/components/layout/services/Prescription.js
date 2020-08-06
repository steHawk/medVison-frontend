import React, { Component } from "react";
import { connect } from "react-redux";

// import PropTypes from "prop-types";
import axios from "axios";
import {
  prescription,
  uploadFileError,
  addressError,
  fileUploadSuccess,
} from "../../../actions/medicineActions";
import { Redirect } from "react-router-dom";

class Prescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hno: JSON.parse(localStorage.getItem("shippingAddress")).doorNo,
      street: JSON.parse(localStorage.getItem("shippingAddress")).street,
      pinCode: JSON.parse(localStorage.getItem("shippingAddress")).pincode,
      city: JSON.parse(localStorage.getItem("shippingAddress")).city,
      file: null,
      file_url: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleFileUpload = (event) => {
    this.setState({ file: event.target.files });
  };

  submitFile = (event) => {
    event.preventDefault();

    if (this.state.file === null) {
      this.props.uploadFileError();
    } else {
      const formData = new FormData();
      formData.append("file", this.state.file[0]);
      formData.append("name", localStorage.getItem("user"));
      console.log(formData);
      axios
        .post(
          "https://api.emetroplus.com/aws/prescription-upload",
          formData,
          {}
        )
        .then((response) => {
          console.log(response);
          this.setState({ file_url: response.data.Location });
          this.props.fileUploadSuccess();
        })
        .catch((error) => {
          // handle your error
          console.log(error);
        });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.file === null || this.state.file_url === null) {
      this.props.uploadFileError();
    } else if (this.state.hno === "" || this.state.street === "") {
      this.props.addressError();
    } else {
      const { hno, street, pinCode, city, file_url } = this.state;
      const prescription = {
        hno,
        street,
        pinCode,
        city,
        file_url,
      };
      this.props.prescription(prescription);
      console.log(prescription);
    }
  };

  render() {
    const { hno, street, pinCode, city } = this.state;
    if (this.props.gotDocToken) {
      return <Redirect exact to="/" />;
    }
    return (
      <div className="container my-4">
        <form onSubmit={this.onSubmit}>
          <h4 className="font-weight-bold">Please upload file of your prescription</h4>
          <small>
            <i className="fa fa-file mr-2" aria-hidden="true"></i>
            File type may be .IMG .PDF .TXT .JPG .JPEG
          </small>
          <hr />
          <div className="text-center my-2">
            <input
              label="choose file"
              type="file"
              onChange={this.handleFileUpload}
              className="my-2"
            />
            <button className="button-secondary my-2" onClick={this.submitFile} type="submit">
              upload
            </button>
          </div>
          <p className="font-weight-bold">
            <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
            Confirm Your Delivery location
          </p>
          <hr />
          <div className="form-group">
              <label>House / Flat Number</label>
              <input
                className="form-control mb-2"
                type="text"
                name="hno"
                onChange={this.onChange}
                value={hno}
              />
              <label>Street</label>
              <input
                className="form-control mb-2"
                type="text"
                name="street"
                onChange={this.onChange}
                value={street}
              />
              <label>Pin Code</label>
              <input
                className="form-control mb-2"
                type="number"
                name="pinCode"
                onChange={this.onChange}
                value={pinCode}
              />
              <label>City</label>
              <input
                className="form-control mb-2"
                type="text"
                name="city"
                onChange={this.onChange}
                value={city}
              />
          </div>
          <div className="text-right mt-4 mb-2">
            <button type="submit" className="button-primary">
              Confirm your order{" "}
              <i
                className="fa fa-angle-right fa-inverse"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ gotDocToken: state.doctors.gotDocToken,});
export default connect(mapStateToProps, {
  prescription,
  uploadFileError,
  addressError,
  fileUploadSuccess,
})(Prescription);
