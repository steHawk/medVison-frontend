import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch.js";
import logo from "../../icon.png";
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
      <nav className="navbar navbar-expand-lg navbar-dark flex-wrap">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="eMetroPlus" id="logo" />{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="search-container form-inline my-2 my-lg-0">
          <form className="search-form">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search.."
              // value={this.state.item}
              onChange={(event) => this.onChange(event)}
            />
            <Link className="btn text-success" to="/meditems">
              <i className="fa fa-search "></i>
            </Link>
          </form>
          <table className="drugList table table-striped m-0 shadow">
            <tbody>
              {this.props.data.map((items, i) => (
                <tr key={i}>
                  <td>
                    <Link
                      to={{
                        pathname: "/to/item",
                        state: { items: items },
                      }}
                      className="text-decoration-none secondary-text"
                      onClick={() => this.ClearItemsList()}
                    >
                      {" "}
                      {items.doctorPrescriptionName}
                    </Link>
                  </td>
                  <td>
                    ₹{items.mrp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-2">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/doctors" className="nav-link">
                Doctor Consultation
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/meditems" className="nav-link">
                Medicines & Supplies
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/alltests" className="nav-link">
                Lab Services
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            </li> */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* Hello, {this.user.userName} */}
                Hello, User
              </Link>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                {isAuthenticated ? (
                  <ul>
                    <Link className="dropdown-item" to="#">
                      <i class="fas fa-sign-out-alt mr-3"></i>Logout
                    </Link>
                    <Link>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          fill="white"
                          d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                        />
                      </svg>{" "}
                    </Link>
                  </ul>
                ) : (
                  <Link className="dropdown-item" to="/login">
                    <svg
                      className="mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <g>
                        <rect fill="none" height="24" width="24" />
                      </g>
                      <g>
                        <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                      </g>
                    </svg>
                    Sign In
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      // =========================================================================
      //
      //
      // Old Nav
      // <div className="topnav">
      //   <div className="nav-line-1">
      //     <div className="nav-left">
      //       <Link to="/">
      //         {" "}
      //         <img src={logo} alt="eMetroPlus" id="logo" />{" "}
      //       </Link>
      //     </div>

      //     <div className="search-container">
      //       <input
      //         type="text"
      //         placeholder="Search.."
      //         value={this.state.item}
      //         name="item"
      //         onChange={(event) => this.onChange(event)}
      //       />
      //       <button type="submit">
      //         <i className="fa fa-search "></i>
      //       </button>

      //     <table className="drugList">
      //       <tbody>
      //         {this.props.data.map((items, i) => (
      //           <tr key={i}>
      //             <td>
      //               <Link
      //                 to={{
      //                   pathname: "/to/item",
      //                   state: { items: items },
      //                 }}
      //                 onClick={() => this.ClearItemsList()}
      //               >
      //                 {" "}
      //                 {items.doctorPrescriptionName}
      //               </Link>
      //             </td>
      //             <td>{items.mrp}</td>
      //           </tr>
      //         ))}
      //       </tbody>
      //     </table>
      //     </div>

          // {isAuthenticated ? (
          //   <div className="nav-right">
          //     <Link to="/profile">
          //       <span>Hello, {this.props.auth.user.userName}</span>
          //     </Link>
          //     {/* <Link to="/logout">
          //       <span>Logout</span>
          //     </Link> */}
          //     <Link to="/cart">
          //       <span>
          //         Cart<span className="fa fa fa-shopping-cart fa-2x"></span>
          //       </span>
          //     </Link>
          //   </div>
          // ) : (
          //   <div className="nav-right">
          //     <Link to="/login">
          //       <span>Hello, Sign in</span>
          //     </Link>
          //     <Link to="/login">
          //       <span>
          //         Cart<span className="fa fa fa-shopping-cart fa-2x"></span>
          //       </span>
          //     </Link>
          //   </div>
          // )}
        // </div>

      //   <div className="nav-line-2">
      //     <div className="navLine-2">
      //       <div className="link-l"></div>
      //       <div className="nav-Line2-links">
      // <Link to="/doctors" className="nav-a">
      //   Doctor Consultation
      // </Link>
      // <Link to="/alltests" className="nav-a">
      //   Lab Services
      // </Link>
      // <Link to="/meditems" className="nav-a">
      //   Medicines & Med Supplies
      // </Link>
      // <Link to="/docConsult" className="nav-a">
      //   Nursing
      // </Link>
      //       </div>

      //       <div></div>
      //     </div>
      //   </div>
      // </div>
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
