import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class Profile extends Component {
  state = {
    name: "",
    mobileNumber: "",
    address: [{}]
  };

  static propTypes = {

  };


  componentDidMount() {
    this.interval = setInterval(() => this.setState({
      mobileNumber: this.props.auth.user.mobile, name: this.props.auth.user.userName, address: this.props.auth.user.shippingAddress
    }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {


    return (
      <div className="profile">
        <div className="p_address">
          <div className="edit">
            <h1>Your eMetroPlus Profile</h1>

            <Link to="/">edit</Link>
          </div>
          <p>Name : {this.state.name}</p>
          <p>Gender : Male</p>
          <p>age : 23ys</p>
          <p>mobile :  {this.state.mobileNumber}</p>
          <b>Address</b>
          <p> {this.state.address[0].hno}</p>
          <p>{this.state.address[0].street}</p>
          <p>{this.state.address[0].city}</p>
          <p>{this.state.address[0].pincode}</p>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);


