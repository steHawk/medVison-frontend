import React, { Component } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

class TestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      age: "",
      number: "",
      hno: "",
      street: "",
      pinCode: "",
      city: "",
      test_details: "",
      date: new Date(),
      time: "10:00",
    };
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  dateChanged = (date) => this.setState({ date });

  timeChange = (time) => this.setState({ time });

  onSubmit = (e) => {};

  render() {
    console.log(this.state);
    const {
      firstName,
      lastName,
      gender,
      email,
      number,
      age,
      hno,
      street,
      pinCode,
      city,
      test_details,
      date,
      time,
    } = this.state;
    return (
      <div className="t_form">
        <h2>Fill Details For Medical Test</h2>
        <div className="test_form">
          <form onSubmit={this.onSubmit}>
            <div className="pair">
              <div className="form_ele">
                <label>First Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  onChange={this.onChange}
                  value={firstName}
                />
              </div>
              <div className="form_ele">
                <label>Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  onChange={this.onChange}
                  value={lastName}
                />
              </div>
            </div>

            <div className="pair">
              <div className="form_ele">
                <label>Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={this.onChange}
                  value={gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form_ele">
                <label>Age</label>
                <input
                  className="form-control"
                  type="text"
                  name="age"
                  onChange={this.onChange}
                  test_form
                  value={age}
                />
              </div>
            </div>
            <div className="pair">
              <div className="form_ele">
                <label>Number</label>
                <input
                  className="form-control"
                  type="number"
                  name="number"
                  onChange={this.onChange}
                  value={number}
                />
              </div>

              <div className="form_ele">
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />
              </div>
            </div>
            <label className="lo">Location</label>
            <div className="d_pair">
              <div className="pair">
                <div className="form_ele">
                  <label>House Number / Flat Number</label>
                  <input
                    className="form-control"
                    type="text"
                    name="hno"
                    onChange={this.onChange}
                    value={hno}
                  />
                </div>
                <div className="form_ele">
                  <label>Street</label>
                  <input
                    className="form-control"
                    type="text"
                    name="street"
                    onChange={this.onChange}
                    value={street}
                  />
                </div>
              </div>

              <div className="pair">
                <div className="form_ele">
                  <label>Pin Code</label>
                  <input
                    className="form-control"
                    type="number"
                    name="pinCode"
                    onChange={this.onChange}
                    value={pinCode}
                  />
                </div>

                <div className="form_ele">
                  <label>City</label>
                  <input
                    className="form-control"
                    type="text"
                    name="city"
                    onChange={this.onChange}
                    value={city}
                  />
                </div>
              </div>
            </div>

            <div className="test_img">
              <p className="img_dis">Upload prescription from Camera or Gallery</p>
              <div className="cam">
                <button className="but-img">
                  <p>CAMERA</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </button>
              </div>
              <div className="cam">
                <button className="but-img">
                  <p>GALLERY</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="form_ele">
              <label>Test Details</label>
              <input
                className="form-control"
                type="text"
                name="test_details"
                onChange={this.onChange}
                value={test_details}
              />
            </div>

            <div className="picker">
              <div className="form_ele">
                <DatePicker value={date} onChange={this.dateChanged} />
              </div>
              <div className="form_ele">
                <TimePicker onChange={this.timeChange} value={time} />
              </div>
            </div>

            <div className="form_ele">
              <button type="submit" className="btn_test">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TestForm;
