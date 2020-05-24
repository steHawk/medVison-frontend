import React, { Component } from 'react'
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

class ConsultForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          age: "",
          number: "",
          complaint: "",
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
          complaint,
          date,
          time,
        } = this.state;
        return (
          <div className="t_form">
            <h2>Request Callback</h2>
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
              
    
                <div className="form_ele">
                  <label>What is your medical complaint?</label>
                  <input
                    className="form-control"
                    type="text"
                    name="complaint"
                    onChange={this.onChange}
                    value={complaint}
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


                <div className="callb">
                  <h2>--(OR)--</h2>
                  <h3>Call Us On</h3>
                  <h1>(+91) 91 33 55 77 99</h1>
                </div>
    
                <div className="form_but">
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

export default ConsultForm;