import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        <h4 className="font-weight-bold">Please upload file of your prescription</h4>
        <small>
          <i className="fa fa-file mr-2" aria-hidden="true"></i>
          File type may be .JPG .JPEG
        </small>
        <hr />
        <div className="presc-wrapper">
          <div className="row m-0 my-4">
            <div className="col-lg-6 col-sm-12 mx-auto">
              <div className="text-center my-2">
                <input
                  label="choose file"
                  type="file"
                  accept="image/*"
                  onChange={this.handleFileUpload}
                  className="my-2"
                />
                <button className="button-secondary my-2" onClick={this.submitFile} type="submit">
                  upload
                </button>
              </div>
            </div>
          </div>
            <hr className="clearfix w-100 d-md-none" />
          <div className="row m-0 my-4">
            <div className="col-lg-6 col-sm-12 mx-auto">
              <div className="presc-preview">
                <img id="presc" className="img-fluid" />
              </div>
              <div className="preview-trash">
                <button className="btn btn-danger presc-trash-btn" id="prescTrash" onClick={() => window.location.reload(false)}><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
          <div className="text-center my-4 proceed">
              <Link to="/confirmAddress"><button className="button-primary">Proceed</button></Link>
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
