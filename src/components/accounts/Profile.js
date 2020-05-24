import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="p_img">
          <img src="/img/profile.jpg" alt="Avatar" />
          <div className="name">
            <div className="name_edit">
              <h1>Jon Elon</h1>
              <Link to="/">edit</Link>
            </div>

            <div className="p_pair">
              <strong>Gender :</strong> <p>   Male</p>
            </div>
            <div className="p_pair">
              <strong>Age :</strong> <p>   23yrs</p>
            </div>
            <div className="pass_change">
            <Link to="/" > Change Password</Link>
            </div>
          </div>
        </div>

        <div className="p_address">
        <div className="add_edit">
        <h1>Address</h1>

          <Link to="/">edit</Link>
          </div>
          <p>63/B, FCI Employees Cooperative Housing Society,</p>
          <p>Indira Nagar,</p>
          <p>Hyderabad</p>
          <p>500032</p>
        </div>

        <div className="p_contact">
          <strong>
            Email : <p>ychaitu.in@gmail.com</p>
          </strong>
          <strong>
            Mobile : <p>9912654045</p>
          </strong>
        </div>
      </div>
    );
  }
}

export default Profile;
