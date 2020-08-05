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
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="eMetroPlus" id="logo" />{" "}
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/doctors" className="nav-link">
                Doctor Consultation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/alltests" className="nav-link">
                Lab Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/meditems" className="nav-link">
                Medicines & Med Supplies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/docConsult" className="nav-link">
                Nursing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {/* Hello, {this.props.auth.user.userName} */}
                Hello, User
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#"><i className='fa fa-user mr-2'></i>Logout</Link>
              </div>
            </li>
          </ul>
          <div className="search-container form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search.." aria-label="Search" value={this.state.item} onChange={(event) => this.onChange(event)} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fa fa-search "></i></button>
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

      //     {isAuthenticated ? (
      //       <div className="nav-right">
      //         <Link to="/profile">
      //           <span>Hello, {this.props.auth.user.userName}</span>
      //         </Link>
      //         {/* <Link to="/logout">
      //           <span>Logout</span>
      //         </Link> */}
      //         <Link to="/cart">
      //           <span>
      //             Cart<span className="fa fa fa-shopping-cart fa-2x"></span>
      //           </span>
      //         </Link>
      //       </div>
      //     ) : (
      //       <div className="nav-right">
      //         <Link to="/login">
      //           <span>Hello, Sign in</span>
      //         </Link>
      //         <Link to="/login">
      //           <span>
      //             Cart<span className="fa fa fa-shopping-cart fa-2x"></span>
      //           </span>
      //         </Link>
      //       </div>
      //     )}
      //   </div>

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
