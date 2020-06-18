
































import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types'


export class ProfileUpdate extends Component {
  state = {
    userName: this.userName,
    gender: this.gender,
    age: this.age,
    address: [{
      doorNo: this.doorNo,
      street: this.street,
      landMark: this.landMark,
      pincode: this.pincode,
      city: this.city
    }]
  };
  static propTypes = {

    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.setState({
     userName: this.props.auth.user.userName, address: this.props.auth.user.shippingAddress
    });
  }


  onSubmit = (e) => {
    e.preventDefault();
    const { userName,
      gender,
      age,
      address } = this.state;
    const updateUser = {
      userName,
      gender,
      age,
      address
    };

    console.log(updateUser)
  };


  // onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onChange = (e) => this.setState({

 
    [e.target.name]: e.target.value,
    // address: [...this.state.address, e.target.value,]
    ...this.state.address.map((address,i) => {
      console.log(address[e.target.name] , e.target.value.slice(0,-1))
      console.log(i)
      if(address[e.target.name] === e.target.value.slice(0,-1)){
       address[e.target.name]  = e.target.value
      }
    })
  });

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect exact to="/" />;
    // }
    const { userName, age, gender, address } = this.state;
    return (
      <div className="">
        <div className="auth-form">
          <form onSubmit={this.onSubmit}>

            <div className="log-ele">
              <label>Name</label>
              <input
                type="text"
                className=""
                name="userName"
                onChange={this.onChange}
                value={userName}
              />
            </div>


            <div className="log-ele">
              <label>Gender</label>
              <input
                type="text"
                className=""
                name="gender"
                onChange={this.onChange}
                value={gender}
              />
            </div>

            <div className="log-ele">
              <label>age</label>
              <input
                type="text"
                className=""
                name="age"
                onChange={this.onChange}
                value={age}
              />
            </div>

            {address.map((address, index) => (
              <div key={index} className="address">
                <div className="log-ele">
                  <label>Door Number</label>
                  <input
                    type="text"
                    className=""
                    name= "doorNo"
                    onChange={this.onChange}
                    value={address.doorNo}
                  />
                </div>

                <div className="log-ele">
                  <label>Street</label>
                  <input
                    type="text"
                    className=""
                    name="street"
                    onChange={this.onChange}
                    value={address.street}
                  />
                </div>

                <div className="log-ele">
                  <label>LandMark</label>
                  <input
                    type="text"
                    className=""
                    name="landmark"
                    onChange={this.onChange}
                    value={address.landMark}
                  />
                </div>

                <div className="log-ele">
                  <label>City</label>
                  <input
                    type="text"
                    className=""
                    name="city"
                    onChange={this.onChange}
                    value={address.city}
                  />
                </div>

                <div className="log-ele">
                  <label>Pincode</label>
                  <input
                    type="text"
                    className=""
                    name="pincode"
                    onChange={this.onChange}
                    value={address.pincode}
                  />
                </div>
              </div>
            ))}




            <div className="">
              <button className="authBut" type="submit">
                Register
              </button>
            </div>
            <p>
              Have an account? <Link className="relink" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileUpdate);
