import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import fileImage from "../../../assets/file.svg";

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
      <div className="container" >
        <div className="page-indicator my-2">
          <small className="primary-text">Home/Upload Prescription</small>
        </div>
        <h4 className="font-weight-bold">Upload Prescription</h4>
        {(this.state.fileArray || []).map((url, index) => (
          <div key={index} style={{ backgroundColor: "white", marginTop: "2%" }} className="presc-wrapper col-lg-6 mx-auto d-flex flex-column align-items-center">
            <img width="70%" src={url} alt="Prescription" className="img-fluid my-2" />
            <button
              className="presc-btn btn rounded-pill px-5 py-2 my-4 shadow"
              style={{ backgroundColor: "red" }}
              id="prescTrash"
              onClick={(e) => this.removePrescription(index)}
              name="prescTrash"
            >
              <i className="fa fa-trash mr-2"></i>
            </button>
          </div>
        ))}
        <div className="upload-btn-wrapper text-center">
          <p className="btn rounded-pill px-5 py-2 my-4 shadow" style={{ backgroundColor: "#fff", display: this.state.loading }} >
            Please Wait...
          </p>
          <label htmlFor="prescUpload" style={{ backgroundColor: "#ddd" }} className="btn rounded-pill px-5 py-2 my-4 shadow">
            <i className="fa fa-image mr-2"></i>Upload</label>
          <input
            id="prescUpload"
            className="btn rounded-pill px-5 py-2 shadow"
            type="file"
            label="Choose Prescription File"
            accept="image/*"
            onChange={(e) => this.uploadFile(e)}
            multiple
            style={{ display: 'none' }}
          />
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
