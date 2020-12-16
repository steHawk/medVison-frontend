import React, {Component} from "react";
import {connect} from "react-redux";
import fileImage from "../../../assets/file.svg";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// import PropTypes from "prop-types";
import {fileUploadSuccess, prescription, uploadFileError,} from "../../../actions/medicineActions";
import instance from "../../../api/instance";

class Prescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Prescription File
            file: null,
            fileArray: this.props.history.location.state === undefined ? [] : this.props.history.location.state.files,
            file_url: "",
            loading: "none",

            // Form
            name: localStorage.getItem("userName") ? localStorage.getItem("userName") : "",
            mobileNumber: localStorage.getItem("number") ? localStorage.getItem("number") : "",
            address: localStorage.getItem("address"),
            files: (props.history.location.state && props.history.location.state.files) ? props.history.location.state.files : [],
            success: false,
            errorMsg: "",
            isUserDetails: true,

            // Modal
            show: false,
        }
    }

    handleShow = () => this.setState({ show: true })
    handleClose = () => this.setState({ show: false })

    uploadFile(e) {
        this.setState({
            loading: "flex",
        })
        let data = new FormData();
        data.append('file', e.target.files[0]);
        // data.append('name', localStorage.getItem('userName'))

        instance.post('aws/prescription-upload', data)
            .then((response) => {
                let fileArray = [...this.state.fileArray]
                fileArray.push(response.data.Location)
                this.setState({
                    fileArray,
                    files: fileArray,
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
            this.setState({fileArray: array})
        }
        // console.log("---", this.state.fileArray);
    }

    onChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        });
    }

    submitPrescription = (e) => {

        e.preventDefault();

        if (this.state.name && this.state.address) {
            let body = {
                prescriptionDetails: {
                    userName: this.state.name,
                    mobile: this.state.mobileNumber,
                    prescriptionImg: this.state.files,
                    address: this.state.address,
                }
            }
            instance.post('prescription/upload', body)
                .then((response) => {
                    if (response.data.ok) {
                        this.setState({
                            success: true,
                            show: true
                        })
                    }
                }).catch((error) => {
                console.error("***", error);
                })
        } else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    errorMsg: "Please update your details",
                    isUserDetails: false,
                }
            })
        }
    }

    render() {
            return (
            <div className="container bg-white rounded-lg p-2 p-lg-4 my-4">
                <div className="p-2">
                    <h4 className="font-weight-bold">Upload Prescription</h4>
                    <p className="text-muted">Finish uploading prescription in just <span className="primary-text">Two Steps</span></p>
                </div>
                <div className="row m-0">
                    <div
                        className="col-lg-6 col-md-6 my-2 p-2">
                        <h5 className="font-weight-bold">Step 1</h5>
                        <p className="text-muted">Please upload the Image file(s) of your prescription</p>
                        <div className="text-center">
                            <p className="my-2" style={{display: this.state.loading}}>
                                Please Wait...
                            </p>
                            <div>
                                {(this.state.fileArray || []).map((url, index) => (
                                <div key={index}
                                    className="presc-wrapper w-75 d-flex flex-column align-items-center bg-white mx-auto my-2">
                                    <img src={url} alt="Prescription" width="200px"/>
                                    <button
                                        className="btn rounded-circle my-4 shadow"
                                        style={{backgroundColor: "red"}}
                                        id="prescTrash"
                                        onClick={(e) => this.removePrescription(index)}
                                        name="prescTrash"
                                    >
                                        <i className="fa fa-trash text-white"></i>
                                    </button>
                                </div>
                                ))}
                                {this.state.fileArray.length === 0  ? <img src={fileImage} alt="fileImage" width="100px"/> : <span></span>}
                                
                            </div>
                            <label htmlFor="prescUpload"
                                className="btn secondary-bg border-black rounded-pill px-5 py-2 my-4 shadow">
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
                                style={{display: 'none'}}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 my-2 prescription-form">
                        {
                        <div>
                            <h5 className="font-weight-bold">Step 2</h5>
                            <p className="text-muted">Please fill the details and click on Finish</p>
                            <span className="text-danger">{this.state.errorMsg}</span>
                            <input type="text" className="form-control my-4" placeholder="Name" name="name" value={this.state.name} onChange={(e) => this.onChange(e)} required/>
                            <input type="tel" className="form-control my-4" placeholder="Mobile Number" name="mobileNumber" value={this.state.mobileNumber} onChange={(e) => this.onChange(e)} required/>
                            <input className="form-control my-4"placeholder="Address" name="address" value={this.state.address || ""} onChange={(e) => this.onChange(e)} required />
                            <div className="text-center">
                                <button className="button-primary rounded-pill" onClick={(e) => this.submitPrescription(e)}>
                                        Finish
                                </button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="container p-2">
                    <Modal show={this.state.show} size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                        <Modal.Title className="text-success">Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Your prescription has been uploaded successfully! Our customer support will contact you.</p>
                            <p>Thank you!</p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                </Modal>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({gotDocToken: state.doctors.gotDocToken,});
export default connect(mapStateToProps, {
    prescription,
    uploadFileError,
    fileUploadSuccess,
    // removePrescription,
})(Prescription);
