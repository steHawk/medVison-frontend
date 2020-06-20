import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import axios from "axios";

class Prescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hno: "",
      street: "",
      pinCode: "",
      city: "",
      file: null
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleFileUpload = (event) => {
    this.setState({ file: event.target.files });
    };



  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    formData.append("name", "chaitanya");
    console.log(formData)
    axios
      .post("https://api.emetroplus.com/aws/prescription-upload", formData, {})
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        // handle your error
        console.log(error);
      });
  };



  render() {
    const { hno, street, pinCode, city } = this.state;
    return (
      <div className="prescription">
        <form onSubmit={this.onSubmit}>
          <h1>Please upload file of your prescription</h1>
          <p>
            <i className="fa fa-file" aria-hidden="true"></i>
            File type may be .IMG .PDF .TXT .JPG .JPEG
          </p>
          <hr></hr>
          <input label="choose file"
            type="file"
            onChange={this.handleFileUpload} className="file_but" />
          <strong>No file selected</strong>
          <button onClick={this.submitFile} type="submit">upload</button>
          <p>
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            Choose Your Delivery location
          </p>
          <hr></hr>

          <div className="pair_p">
            <div className="form_elem">
              <label>House / Flat Number</label>
              <input
                className="form-control"
                type="text"
                name="hno"
                onChange={this.onChange}
                value={hno}
              />
            </div>
            <div className="form_elem">
              <label>Street</label>
              <input
                className="form-control"
                type="text"
                name="street"
                onChange={this.onChange}
                value={street}
              />
            </div>
          </div>

          <div className="pair_p">
            <div className="form_elem">
              <label>Pin Code</label>
              <input
                className="form-control"
                type="number"
                name="pinCode"
                onChange={this.onChange}
                value={pinCode}
              />
            </div>

            <div className="form_elem">
              <label>City</label>
              <input
                className="form-control"
                type="text"
                name="city"
                onChange={this.onChange}
                value={city}
              />
            </div>
          </div>

          <div className="">
            <button type="submit" className="pre_but">
              Conform your order{" "}
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

const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, {})(Prescription);




