import React, { Component } from "react";
import 'react-multi-carousel/lib/styles.css';

import { Link } from "react-router-dom";
import { connect } from "react-redux";


class Profile extends Component {
  state = {
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    mobileNumber: localStorage.getItem("number"),
    age: localStorage.getItem("age") ,
    gender: localStorage.getItem("gender"),
    address: localStorage.getItem("address"),
  }


  render() {
    const textAreaStyle = {
      resize: "none",
      background: "transparent",
      fontSize: "1.2em",
      border: "0px"
    }

    return (
      <div className="container my-4">
        <div className="row m-0">
          <div className="col-lg-6 col-md-10 p-0 mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="font-weight-bold">
                Your <span className="primary-text">eMetroPlus</span> Profile
              </h5>
                <div className="text-right my-2">
                  <Link to="/profileUpdate"><i className="fas fa-edit mr-2"></i>Edit</Link>
                </div>
                <div className="table-responsive">
                  <table className="table table-borderless m-0">
                    <tbody>
                      <tr>
                        <td className="secondary-text">Name :</td>
                        <td>{this.state.name}</td>
                      </tr>
                      <tr>
                        <td className="secondary-text">Email :</td>
                        <td>{this.state.email}</td>
                      </tr>
                      <tr>
                        <td className="secondary-text">Mobile :</td>
                        <td>{this.state.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td className="secondary-text">Gender :</td>
                        <td>{this.state.gender}</td>
                      </tr>
                      <tr>
                        <td className="secondary-text">Age :</td>
                        <td>{this.state.age}</td>
                      </tr>
                      <tr>
                        <td className="secondary-text">Address :</td>
                        <td>
                          <textarea rows="2" disabled style={textAreaStyle}>
                            {this.state.address}
                          </textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);


