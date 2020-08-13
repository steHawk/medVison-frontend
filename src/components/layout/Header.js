import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../icon.png";
import { logout } from "../../actions/authActions";
import { search, clearItemsList } from "../../actions/medSearch";
import { connect } from "react-redux";

const Header = ({ auth, logout, search, clearItemsList, data }) => {

  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
    search(e.target.value);
  }

  const ClearItemsList = () => {
    clearItemsList();
  }


  const { isAuthenticated, user } = auth;

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
            value={text}
            onChange={onChange}
          />
          <Link className="btn text-success" to="/meditems">
            <i className="fa fa-search "></i>
          </Link>
        </form>
        <table className="drugList table table-striped m-0 shadow">
          <tbody>
            {data.map((items) => (
              <tr key={items._id}>
                <td>
                  <Link
                    to={{
                      pathname: "/to/item",
                      state: { items: items },
                    }}
                    className="text-decoration-none secondary-text"
                    onClick={() => ClearItemsList()}
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
          <li className="nav-item dropdown">
            {isAuthenticated ?
              (<Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hello, {user.userName}
              </Link>)
              :
              (<Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hello, User
              </Link>)
            }
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              {isAuthenticated ? (
                <ul>
                  <Link class="nav-link text-dark text-decoration-none" to="/cart">
                    <i class="fas fa-shopping-cart"></i>{" "}Cart

                  </Link>
                  <Link class="nav-link text-dark text-decoration-none" onClick={logout} to="/" >
                    <i class="fas fa-sign-out-alt"></i>{" "}Logout
                    </Link>
                </ul>
              ) : (
                  <Link className="dropdown-item" to="/login">
                    <i class="fas fa-sign-in-alt"></i>{" "}Sign In
                  </Link>
                )}
            </div>
          </li>
        </ul>
      </div>
    </nav>

  );

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data.data,
  isDataLoading: state.data.isDataLoading,
});
export default connect(mapStateToProps, { logout, search, clearItemsList })(
  Header
);
