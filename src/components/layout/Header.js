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
    <nav className="navbar navbar-expand-lg navbar-dark flex-wrap" >
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="eMetroPlus" id="logo" />{" "}
      </Link>
      <button id="ham"
        className="navbar-toggler border-0 nav-button mr-2"
        type="button"
        data-toggle="collapse"
        data-target="#navigation"
        aria-expanded="false"
        aria-label="Navigation"
        onClick={hamClick}
      >
        <span id="bar1"></span>
        <span id="bar2"></span>
        <span id="bar3"></span>
      </button>

      <div className="search-container form-inline my-2 my-lg-0">
        <form className="search-form">
          <div class="input-group-btn search-panel">
            <button type="button" class="btn btn-default bg-white dropdown-toggle" data-toggle="dropdown">
              <span id="search_concept">All</span>
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><Link to="#!" class="dropdown-item text-decoration-none text-dark">Medicines</Link></li>
              <li><Link to="#!" class="dropdown-item text-decoration-none text-dark">Doctors</Link></li>
            </ul>
          </div>
          <input type="hidden" name="search_param" value="all" id="search_param" />
          <input
            type="text"
            class="form-control mr-sm-2"
            placeholder="Search..."
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

      <div className="collapse navbar-collapse" id="navigation">
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
                <ul className="text-left">
                  <Link class="nav-link text-dark text-decoration-none p-1 mx-2" to="/profile">
                    <i class="fas fa-user-circle mr-1 icon-primary"></i>{" "}Profile
                  </Link>
                  <div class="dropdown-divider"></div>
                  <Link class="nav-link text-dark text-decoration-none p-1 mx-2" to="/cart">
                    <i class="fas fa-shopping-cart mr-1 icon-primary"></i>{" "}Cart
                  </Link>
                  <div class="dropdown-divider"></div>
                  <Link class="nav-link text-dark text-decoration-none p-1 mx-2" to="/yourOrders">
                    <i class="fas fa-shopping-bag mr-1 icon-primary"></i>{" "}Orders
                  </Link>
                  <div class="dropdown-divider"></div>
                  <Link class="nav-link text-dark text-decoration-none p-1 mx-2" onClick={logout} to="/" >
                    <i class="fas fa-sign-out-alt mr-1 icon-primary"></i>{" "}Logout
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

function hamClick() {
  document.getElementById("bar1").classList.toggle("clicked");
  document.getElementById("bar2").classList.toggle("clicked");
  document.getElementById("bar3").classList.toggle("clicked");
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data.data,
  isDataLoading: state.data.isDataLoading,
});
export default connect(mapStateToProps, { logout, search, clearItemsList })(
  Header
);
