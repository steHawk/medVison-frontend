import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch.js";
import logo from "../../icon.png";
import Navbar from "./Navbar.js";
import { logout } from "../../actions/authActions";
import { search, clearItemsList } from "../../actions/medSearch";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
    };
  }

  static propTypes = {
    search: PropTypes.func.isRequired,
    ClearItemsList: PropTypes.func,
    isDataLoading: PropTypes.bool,
    data: PropTypes.array,
  };

  onChange(event) {
    if (event.target.value.length > 0) {
      this.setState({
        [event.target.name]: event.target.value,
        msg: "Loading...!!!",
      });
      this.props.search(event.target.value);
    } else {
      this.setState({ [event.target.name]: event.target.value, msg: "" });
    }
  }

  ClearItemsList() {
    this.props.clearItemsList();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    // function handleBlur(e) {
    //   console.log("hi");
    //   document.querySelector(".main-menu").classList.toggle("show");
    // }
    return (
      <div class="topnav">
        <div class="nav-line-1">
          <div class="nav-left">
            <Link to="/">
              {" "}
              <img src={logo} alt="eMetroPlus" id="logo" />{" "}
            </Link>
          </div>

          <div class="search-container">
            <input
              type="text"
              placeholder="Search.."
              value={this.state.item}
              name="item"
              onChange={(event) => this.onChange(event)}
            />
            <button type="submit">
              <i class="fa fa-search "></i>
            </button>

          <table className="drugList">
            <tbody>
              {this.props.data.map((items, i) => (
                <tr key={i}>
                  <td>
                    <Link
                      to={{
                        pathname: "/to/item",
                        state: { items: items },
                      }}
                      onClick={() => this.ClearItemsList()}
                    >
                      {" "}
                      {items.doctorPrescriptionName}
                    </Link>
                  </td>
                  <td>{items.mrp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {isAuthenticated ? (
            <div class="nav-right">
              <Link to="/profile">
                <span>Hello, {this.props.auth.user.userName}</span>
              </Link>
              {/* <Link to="/logout">
                <span>Logout</span>
              </Link> */}
              <Link to="/cart">
                <span>
                  Cart<span class="fa fa fa-shopping-cart fa-2x"></span>
                </span>
              </Link>
            </div>
          ) : (
            <div class="nav-right">
              <Link to="/login">
                <span>Hello, Sign in</span>
              </Link>
              <Link to="/login">
                <span>
                  Cart<span class="fa fa fa-shopping-cart fa-2x"></span>
                </span>
              </Link>
            </div>
          )}
        </div>

        <div class="nav-line-2">
          <div class="navLine-2">
            <div class="link-l"></div>
            <div class="nav-Line2-links">
              <Link to="/doctors" class="nav-a">
                Doctor Consultation
              </Link>
              <Link to="/alltests" class="nav-a">
                Lab Services
              </Link>
              <Link to="/meditems" class="nav-a">
                Medicines & Med Supplies
              </Link>
              <Link to="/docConsult" class="nav-a">
                Nursing
              </Link>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data.data,
  isDataLoading: state.data.isDataLoading,
});
export default connect(mapStateToProps, { logout, search, clearItemsList })(
  Header
);
