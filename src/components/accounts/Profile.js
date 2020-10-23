import React, { Component } from "react";

// Carousel
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePic from '../../assets/profile.png';


class Profile extends Component {
  state = {
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    mobileNumber: localStorage.getItem("number"),
    age: localStorage.getItem("age"),
    gender: localStorage.getItem("gender"),
    address: localStorage.getItem("address"),
  }
    // address: JSON.parse(localStorage.getItem("shippingAddress")),


  render() {
    // const responsive = {
    //   superLargeDesktop: {
    //     breakpoint: { max: 4000, min: 3000 },
    //     items: 5
    //   },
    //   desktop: {
    //     breakpoint: { max: 3000, min: 1024 },
    //     items: 5
    //   },
    //   tablet: {
    //     breakpoint: { max: 1024, min: 464 },
    //     items: 3
    //   },
    //   mobile: {
    //     breakpoint: { max: 464, min: 0 },
    //     items: 1
    //   }
    // };

    return (
      <div className="container my-4">
        <h4 className="font-weight-bold">
        Your <span className="primary-text">eMetroPlus</span> Profile
        </h4>
        <hr />
        <div className="row m-0">

          {/* profile pic */}
          <div className="col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
              <img src={ProfilePic} className="img-fluid" width="100" alt="profile" />
          </div>

          {/* profile-info */}
          <div className="col-lg-5 col-md-5">
            <div className="text-right my-2">
              <Link to="/profileUpdate" className="secondary-text text-decoration-none"><i className="fas fa-edit mr-2"></i>Edit</Link>
            </div>
            <div className="table-responsive bg-white rounded-lg shadow-sm">
              <table className="table table-bordered m-0">
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
            </div>
          </div>

          {/* Address */}
          <div  className="col-lg-5 col-md-5">
            <div className="text-right my-2">
              <Link to="/profileUpdate" className="secondary-text text-decoration-none"><i className="fas fa-edit mr-2"></i>Edit</Link>
            </div>
            <div className="table-responsive bg-white rounded-lg shadow-sm">
                <table className="table table-bordered m-0">
                  <tbody>
                  <tr>
                      <td className="secondary-text">Address </td>
                      <td>{this.state.address}</td>
                    </tr>
                    {/* <tr>
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
                    </tr> */}
                  </tbody>
                </table>
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


