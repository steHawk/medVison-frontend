import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class Profile extends Component {
  state = {
    name: localStorage.getItem("user"),
    email: localStorage.getItem("email"),
    mobileNumber: localStorage.getItem("number"),
    age: localStorage.getItem("age"),
    gender: localStorage.getItem("gender"),
    address: JSON.parse(localStorage.getItem("shippingAddress")),
  };



  render() {

    return (
      <div className="container my-4">
        <h4 className="font-weight-bold">
        Your <span className="primary-text">eMetroPlus</span> Profile
        </h4>
        <hr />
        <div class="row m-0">
          <div className="col-lg-6 col-md-6">

          <div className="text-right my-2">
              <Link to="/profileUpdate" className="secondary-text text-decoration-none"><i class="fas fa-edit mr-2"></i>Edit</Link>
            </div>

            {/* profile-info */}
            <div class="table-responsive">
              <table className="table table-borderless table-striped my-2">
                <tbody>
                  <tr>
                    <td className="secondary-text">Name</td>
                    <td>{this.state.name}</td>
                  </tr>
                  <tr>
                    <td className="secondary-text">Email</td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td className="secondary-text">Mobile</td>
                    <td>{this.state.mobileNumber}</td>
                  </tr>
                  <tr>
                    <td className="secondary-text">Gender</td>
                    <td>{this.state.gender}</td>
                  </tr>
                  <tr>
                    <td className="secondary-text">Age</td>
                    <td>{this.state.age}</td>
                  </tr>
                </tbody>
              </table>
            {/* {this.state.address.length > 0 ? 
            this.state.address.map((address, index) => (  */}
            {/* key={index} */}
            </div>
          </div>

          {/* Address */}
          <div  className="col-lg-6 col-md-6">

            <div className="text-right my-2">
              <Link to="/profileUpdate" className="secondary-text text-decoration-none"><i class="fas fa-edit mr-2"></i>Edit</Link>
            </div>

            <div class="table-responsive">
                <table className="table table-borderless table-striped my-2">
                  <tbody>
                    <tr>
                      <td className="secondary-text">Door </td>
                      <td>{this.state.address.doorNo}</td>
                    </tr>
                    <tr>
                      <td className="secondary-text">LandMark</td>
                      <td>{this.state.address.landMark}</td>
                    </tr>
                    <tr>
                      <td className="secondary-text">Street</td>
                      <td>{this.state.address.street}</td>
                    </tr>
                    <tr>
                      <td className="secondary-text">City</td>
                      <td>{this.state.address.city}</td>
                    </tr>
                    <tr>
                      <td className="secondary-text">PIN</td>
                      <td>{this.state.address.pincode}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
          {/* <b>Type{this.state.address.type}</b> */}
          {/* )):null} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);


