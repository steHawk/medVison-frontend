import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class Profile extends Component {
  state = {
    name: localStorage.getItem("user"),
    email: localStorage.getItem("email"),
    mobileNumber: localStorage.getItem("number"),
    address: JSON.parse(localStorage.getItem("shippingAddress")),
  };



  render() {

    return (
      <div className="profile">
        <div className="p_address">
          <div className="edit">
            <h1>Your eMetroPlus Profile</h1>

            <Link to="/profileUpdate">edit</Link>
          </div>
          <p>Name : {this.state.name}</p>
          <p>Email : {this.state.email}</p>
          <p>Mobile :  {this.state.mobileNumber}</p>
          <p>Gender : {this.state.gender}</p>
          <p>Age : {this.state.age}</p>
          <b>Address</b>
          {/* {this.state.address.length > 0 ? 
          this.state.address.map((address, index) => (  */}
          {/* key={index} */}
          <div  className="address">
            {/* <b>Type : {this.state.address.type}</b> */}
            <p>Door :  {this.state.address.doorNo}</p>
            <p>LandMark : {this.state.address.landMark}</p>
            <p>Street : {this.state.address.street}</p>
            <p>City : {this.state.address.city}</p>
            <p>PIN :{this.state.address.pincode}</p>
          </div>
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


