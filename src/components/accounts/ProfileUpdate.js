import React, { useState } from "react"; //Component,
// import { Link } from "react-router-dom"; //, Redirect
import { connect } from "react-redux";
import baseURL from "../../api/baseURL";
// import { register } from '../../actions/authActions';
// import PropTypes from 'prop-types'
// import history from "../../history";
export function ProfileUpdate(props) {
  const [userName, setuserName] = useState(localStorage.getItem("userName"));

  const [email, setemail] = useState(localStorage.getItem("email"));
  const [mobile, setmobile] = useState(localStorage.getItem("number"));
  const [age, setage] = useState(localStorage.getItem("age"));
  const [gender, setgender] = useState(localStorage.getItem("gender"));
  // const [pincode, setpincode] = useState(localStorage.getItem("pincode"));
  const [address, setaddress] = useState(localStorage.getItem("address"));


  const Submit = (e) => {
    let url = `${baseURL}user/update`; //"https://api.emetroplus.com/user/update";

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "AuthType": "user"
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
          address: address,
          _id: localStorage.getItem("_id"),
        },
      }),
    }).then((response) => {
      if (response.ok) {
        
        console.log(response);

        // Updating LocalStorage
        localStorage.setItem("userName", userName);
        localStorage.setItem("email", email);
        localStorage.setItem("number", mobile);
        localStorage.setItem("gender", gender);
        localStorage.setItem("age", parseInt(age));
        localStorage.setItem("address", address);

        if(props.location.state){
          if(props.location.state.refTo==="billing"){
            window.location.href="/checkout"
          }
          if(props.location.state.refTo==="confirmPrescription"){
            window.location.href = "/confirmprescription"
          }
        }else{
          window.location.href="/profile"
        }
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
              type="number"
              className="form-control mb-2"
              name="age"
              onChange={(e) => setage(e.target.value)}
              value={age}
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <h4 className="font-weight-bold">Edit Shipping Address Info</h4>
            <hr />
            <label>Address</label>
            <textarea
              className="form-control mb-2"
              name="address"
              onChange={(e) => setaddress(e.target.value)}
              value={address}
              placeholder="Address..."
              style={{ resize: "none" }}
              rows="10"
            >

            </textarea>

            {/* <label>Pincode</label>
            <input
              type="text"
              className="form-control mb-2"
              name="pincode"
              onChange={(e) => setpincode(e.target.value)}
              value={pincode}
            /> */}
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
