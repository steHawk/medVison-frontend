import React, { useState } from "react"; //Component,
import { Link } from "react-router-dom"; //, Redirect
import { connect } from "react-redux";
// import { register } from '../../actions/authActions';
// import PropTypes from 'prop-types'

export function ProfileUpdate() {
  const [userName, setuserName] = useState(localStorage.getItem("user"));
  // const [gender, setgender] = useState("");
  // const [age, setage] = useState("");
  const [email, setemail] = useState(localStorage.getItem("email"));
  const [mobile, setmobile] = useState(localStorage.getItem("number"));
  const [age, setage] = useState(localStorage.getItem("age"));
  const [gender, setgender] = useState(localStorage.getItem("gender"));
  const [doorNo, setdoorNo] = useState(
    JSON.parse(localStorage.getItem("shippingAddress")).doorNo
  );
  const [street, setstreet] = useState(
    JSON.parse(localStorage.getItem("shippingAddress")).street
  );
  const [landMark, setlandMark] = useState(
    JSON.parse(localStorage.getItem("shippingAddress")).landMark
  );
  const [pincode, setpincode] = useState(
    JSON.parse(localStorage.getItem("shippingAddress")).pincode
  );
  const [city, setcity] = useState(
    JSON.parse(localStorage.getItem("shippingAddress")).city
  );
  //const [address] = useState([{}]);

  const Submit = (e) => {
    let url = "https://api.emetroplus.com/user/update"; //"https://api.emetroplus.com/user/update";

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("_id"),
        phoneNumber: mobile,
        userDetails: {
          userName: userName,
          email: email,
          phoneNumber: mobile,
          age: parseInt(age),
          gender: gender,
          shippingAddress: [
            {
              doorNo: doorNo,
              street: street,
              landMark: landMark,
              pincode: pincode,
              city: city,
            },
          ],
          _id: localStorage.getItem("_id"),
        },
      }),
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        window.location.href = "/";
      }
    });
    // .catch((e) => {
    //   console.log(e);
    // })
  };

  return (
    <div className="container my-4">
      <form className="form">
        <div className="row m-0">
          <div className="col-lg-6 col-md-6"> 
            <h4 className="font-weight-bold">
            Edit <span className="primary-text">eMetroPlus</span> Profile Info
            </h4>
            <hr />
            <label>Name</label>
            <input
              type="text"
              className="form-control mb-2"
              name="userName"
              onChange={(e) => setuserName(e.target.value)}
              value={userName}
            />
            <label>Email</label>
            <input
              type="email"
              className="form-control mb-2"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />

            <label>Mobile No.</label>
            <input
              type="text"
              className="form-control mb-2"
              name="mobile"
              onChange={(e) => setmobile(e.target.value)}
              value={mobile}
            />

            <label>Gender</label>
            <input
              type="text"
              className="form-control mb-2"
              name="gender"
              onChange={(e) => setgender(e.target.value)}
              value={gender}
            />
            <label>Age</label>
            <input
              type="text"
              className="form-control mb-2"
              name="age"
              onChange={(e) => setage(e.target.value)}
              value={age}
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <h4 className="font-weight-bold">Edit Shipping Address Info</h4>
            <hr />
            <label>Door Number</label>
            <input
              type="text"
              className="form-control mb-2"
              name="doorNo"
              onChange={(e) => setdoorNo(e.target.value)}
              value={doorNo}
            />
            <label>Street</label>
            <input
              type="text"
              className="form-control mb-2"
              name="street"
              onChange={(e) => setstreet(e.target.value)}
              value={street}
            />
            <label>LandMark</label>
            <input
              type="text"
              className="form-control mb-2"
              name="landmark"
              onChange={(e) => setlandMark(e.target.value)}
              value={landMark}
            />
            <label>City</label>
            <input
              type="text"
              className="form-control mb-2"
              name="city"
              onChange={(e) => setcity(e.target.value)}
              value={city}
            />
            <label>Pincode</label>
            <input
              type="text"
              className="form-control mb-2"
              name="pincode"
              onChange={(e) => setpincode(e.target.value)}
              value={pincode}
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="button-secondary" type="button" onClick={(e) => Submit(e)}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileUpdate);
