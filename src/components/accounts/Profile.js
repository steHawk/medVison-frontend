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
    const textAreaStyle = {
      resize: "none",
      background: "transparent",
      fontSize: "1.2em",
      border: "0px"
    }

    return (
      <div className="container my-4">
        <h4 className="font-weight-bold">
          Your <span className="primary-text">eMetroPlus</span> Profile
        </h4>
        <hr />
        <div className="row m-0">

          {/* profile pic */}
          <div className="col-lg-2 col-md-2 d-flex justify-content-center align-items-center">
            <img src={ProfilePic} className="img-fluid" width="80%" alt="profile" />
          </div>


          {/* profile-info */}
          <div className="col-lg-5">
            <div className="text-right my-2">
              <Link to="/profileUpdate" style={{ textDecoration: "none", fontSize: "1.5em" }}><i className="fas fa-edit mr-2"></i>Edit</Link>
            </div>
            <div className="table-responsive bg-white rounded-lg shadow-sm" style={{ width: "100%", padding: "2% 5%" }}>
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
                  <tr>
                    <td className="secondary-text">Address </td>
                    <td>
                      <textarea rows="8" disabled style={textAreaStyle}>
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
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);


