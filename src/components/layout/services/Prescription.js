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
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      file_url: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleFileUpload = (event) => {
    let reader = new FileReader();
    reader.onload = function(){
      let output = document.getElementById('presc');
      let del = document.getElementById('prescTrash');
      del.style.display = "block";
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
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
    } 
  };

  render() {
    if (this.props.gotDocToken) {
      return <Redirect exact to="/" />;
    }
    return (
      <div className="container my-4">
      <div className="page-indicator my-2">
        <small className="primary-text">Home/Upload Prescription</small>
      </div>
      <h4 className="font-weight-bold">Upload Prescription</h4>
      <div className="presc-wrapper col-lg-6 mx-auto d-flex flex-column align-items-center">
        <div className="presc-img-wrapper">
          <div className="presc-img position-relative my-3">
            <img src={fileImage} id="presc" alt="prescription" className="p-2 my-4 img-fluid rounded" />
              <button className="btn text-center position-absolute rounded-circle my-4" id="prescTrash" onClick={() => window.location.reload(false)}><i class="fa fa-times"></i></button>
          </div>
          <div className="upload-btn-wrapper my-4 text-center">
                <label for="prescUpload" class="btn rounded-pill px-5 py-2 shadow"><i class="fa fa-image mr-2"></i>Upload</label>
                <input
                  id="prescUpload"
                  label="choose file"
                  type="file"
                  accept="image/*"
                  onChange={this.handleFileUpload}
                  className="btn rounded-pill px-5 py-2 shadow"
                  style={{display: 'none'}}
                />
          </div>
        </div>
        <button className="button-primary w-50 mx-2">Proceed</button>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ gotDocToken: state.doctors.gotDocToken,});
export default connect(mapStateToProps, {
  prescription,
  uploadFileError,
  fileUploadSuccess,
})(Prescription);
