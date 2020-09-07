import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import fileImage from "../../../assets/file.svg";

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

  fileObj = []
  fileArray = []

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      file_url: "",
    }
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)
  }

  uploadMultipleFiles(e) {
    let del = document.getElementById('prescTrash');
    del.style.display = "block";
    del.setAttribute("class", "mx-auto presc-btn btn rounded-pill px-5 py-2 my-4 shadow bg-danger text-white");
    this.fileObj.push(e.target.files)
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    }
    this.setState({ file: this.fileArray })
  }

  uploadFiles(e) {
    e.preventDefault()
    console.log(this.state.file)
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

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
          []
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
    }
  }

  render() {
    return (
      <div className="container">
        <div className="bg-white rounded-lg shadow-sm p-4 my-4">
          <div className="page-indicator my-2">
            <small className="primary-text">Home/Upload Prescription</small>
          </div>
          <h4 className="font-weight-bold">Upload Prescription</h4>
          <div className="presc-wrapper col-lg-6 mx-auto d-flex flex-column align-items-center">
            <div className="presc-img-wrapper">
              <div className="presc-img my-3">
                {(this.fileArray || []).map(url => (
                  <img src={url} alt="Prescription" className="img-fluid my-2" />
                ))}
              </div>
              <div className="upload-btn-wrapper text-center">
                <label for="prescUpload" class="btn rounded-pill px-5 py-2 my-4 shadow"><i class="fa fa-image mr-2"></i>Upload</label>
                <input
                  id="prescUpload"
                  className="btn rounded-pill px-5 py-2 shadow"
                  type="file"
                  label="Choose Prescription File"
                  accept="image/*"
                  onChange={this.uploadMultipleFiles}
                  multiple
                  style={{ display: 'none' }}
                />
              </div>
              <button className="presc-btn btn rounded-pill px-5 py-2 my-4 shadow" id="prescTrash" onClick={() => window.location.reload(false)}><i class="fa fa-trash mr-2"></i>Remove</button>
            </div>
            <button className="button-primary w-50 mx-2">Proceed</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({ gotDocToken: state.doctors.gotDocToken, });
export default connect(mapStateToProps, {
  prescription,
  uploadFileError,
  fileUploadSuccess,
})(Prescription);
