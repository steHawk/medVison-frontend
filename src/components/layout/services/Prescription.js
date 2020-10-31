import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import fileImage from "../../../assets/file.svg";

// import PropTypes from "prop-types";
import Axios from "axios";
import {
  prescription,
  uploadFileError,
  // addressError,
  fileUploadSuccess,
  // removePrescription,
} from "../../../actions/medicineActions";
// import { Redirect } from "react-router-dom";

class Prescription extends Component {

  // fileObj = []
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileArray: this.props.history.location.state === undefined ? [] : this.props.history.location.state.files,
      file_url: "",
      loading: "none",
    }
  }
  uploadFile(e) {
    this.setState({
      loading: "flex"
    })
    let data = new FormData();
    data.append('file', e.target.files[0]);
    // data.append('name', localStorage.getItem('userName'))
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    Axios.post('https://api.emetroplus.com/aws/prescription-upload', data, config)
      .then((response) => {
        let fileArray = [...this.state.fileArray]
        fileArray.push(response.data.Location)
        this.setState({
          fileArray,
          loading: "none"
        })
      }).catch((error) => {
        console.log(("----****----", error));
        this.props.uploadFileError()
        this.setState({
          loading: "none"
        })
      })
  }


  removePrescription(index) {
    // const index = array.indexOf(5);
    var array = [...this.state.fileArray]
    if (index > -1) {
      array.splice(index, 1);
      this.setState({ fileArray: array })
    }
    // console.log("---", this.state.fileArray);
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.fileArray.length > 0) {
      // console.log("fileArray", this.state.fileArray);
      this.props.history.push({
        pathname: '/confirmprescription',
        state: {
          files: this.state.fileArray
        }
      })
    }
  }

  render() {
    return (
      <div className="container p-0 my-4">
        <div className="upload-heading">
          <h4 className=" font-weight-bold">Upload Prescription</h4>
          <p className="text-muted">Please upload the Image file(s) of your prescription</p>
        </div>
        <hr />
        <div className="row m-0 my-2 mb-4">
          <div className="upload-btn-wrapper rounded border-darken-4 col-lg-6 col-md-6 my-2 text-center d-flex flex-column flex-wrap-reverse justify-content-center align-items-center">
            <div>
              <img src={fileImage} alt="fileImage" width="100px" />
            </div>
            <div>
              <p className="my-2" style={{display: this.state.loading }} >
                Please Wait...
              </p>
              <label htmlFor="prescUpload" className="btn secondary-bg border-black rounded-pill px-5 py-2 my-4 shadow">
                <i className="fa fa-image mr-2"></i>Upload
              </label>
              <input
                id="prescUpload"
                className="btn rounded p-2 shadow"
                type="file"
                label="Choose Prescription File"
                accept="image/*"
                onChange={(e) => this.uploadFile(e)}
                multiple
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            {(this.state.fileArray || []).map((url, index) => (
              <div key={index} className="presc-wrapper w-75 d-flex flex-column align-items-center bg-white mx-auto my-2">
                <img src={url} alt="Prescription" className="img-fluid" />
                <button
                  className="btn rounded-circle my-4 shadow"
                  style={{ backgroundColor: "red" }}
                  id="prescTrash"
                  onClick={(e) => this.removePrescription(index)}
                  name="prescTrash"
                >
                  <i className="fa fa-trash text-white"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="button-primary" onClick={(e) => this.onSubmit(e)} style={{ marginLeft: "40%", width: "20%", boxShadow: "0vh 0vh 1vh 1vh #ddd" }}>Proceed</button>
      </div >
    );
  }
};

const mapStateToProps = (state) => ({ gotDocToken: state.doctors.gotDocToken, });
export default connect(mapStateToProps, {
  prescription,
  uploadFileError,
  fileUploadSuccess,
  // removePrescription,
})(Prescription);
