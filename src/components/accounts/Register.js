import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types'


export class Register extends Component {
  state = {
    userName: '',
    password: '',
    email: '',
    number: '',
    msg: '',
  };
  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };


  componentDidMount() {
    this.setState({ number: this.props.auth.number });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { number, userName, password, email } = this.state;
    const newUser = {
      number,
      userName,
      password,
      email,
    };
    this.props.register(newUser);
    console.log(newUser)
  };



  onChange = (e) => this.setState({ [e.target.name]: e.target.value, msg: "" });

  
  checkMobileNumber(e) {

    var keycode = (e.target.value.which) ? e.target.value.which : e.target.value.keyCode;
    //comparing pressed keycodes
    if(e.target.value.length !== 10){
      this.setState({
        msg: "Invalid Mobile Number"
      })
      return false;
    }
    if (keycode > 31 && (keycode < 48 || keycode > 57)) {
      this.setState({
        msg: "Invalid Mobile Number"
      })
      return false;
    }
    else return true;
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect exact to="/" />;
    }
    const { number, userName, password, email } = this.state;
    return (
      <div className="container my-4">
        <div class="row m-0">
          <div className="col-lg-4 mx-auto bg-white p-4 shadow-lg rounded-lg">
            <h4 className="font-weight-bold">
              Register on <span className="primary-text">eMetroPlus</span>
            </h4>
            <hr />
            <div className="form-group">
              <form onSubmit={this.onSubmit}>
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="number"
                  placeholder="Mobile Number"
                  onChange={this.onChange}
                  value={number}
                  pattern="\d{10}"
                  onBlur={(e) => this.checkMobileNumber(e)}
                />
                <div>
                  <small id="msg" class="text-danger mb-2">{this.state.msg}</small>
                </div>
              
                <label>Name<span className="text-danger"> *</span></label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  name="userName"
                  onChange={this.onChange}
                  value={userName}
                />
              
                <label>Email</label>
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />

                <label>Password<span className="text-danger"> *</span></label>
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                />

                <div className="text-center mb-2 mt-4">
                  <button className="button-primary" type="submit">
                    Register
                    </button>
                  <div>
                  <small>
                    Have an account? <Link className="relink" to="/login">Login</Link>
                  </small>
                  </div>
                </div>
                <p>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
