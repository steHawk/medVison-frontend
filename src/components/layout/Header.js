import React, {useState} from "react";
import {Link} from "react-router-dom";
// import logo from "../../icon.png";
import {logout} from "../../actions/authActions";
import {clearItemsList, search, searchTests} from "../../actions/medSearch";
import {connect} from "react-redux";

import Life from "../../assets/life.svg";

const Header = ({auth, logout, search, searchTests, clearItemsList, data}) => {
    const [text, setText] = useState("");
    const [searchBy, setsearchBy] = useState("Medicines");
    const onChange = (e) => {
        setText(e.target.value);
        if (e.target.value.length <= 0) {
            clearItemsList();
        } else {
            if (searchBy === 'Medicines')
                search(e.target.value);
            else if (searchBy === 'Tests') {
                searchTests(e.target.value);
            }
        }
    };
    const clearSearch = (e) => {
        e.preventDefault();
        setText("");
        clearItemsList();
    }

    const ClearItemsList = () => {
        clearItemsList();
    };

    const {isAuthenticated} = auth;
    // console.log("auth", auth);
    let userName = localStorage.getItem("userName") ? localStorage.getItem("userName").split(" ")[0] : "";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark flex-wrap">
            <Link className="navbar-brand" to="/">
                <img src={Life} alt="eMetroPlus" style={{width: "40px"}}/>
                <span className="title font-weight-bold">eMetroPlus</span>
            </Link>
            <button
                id="ham"
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
                    <div className="input-group-btn search-panel">
                        <button
                            type="button"
                            className="btn btn-default bg-white dropdown-toggle"
                            data-toggle="dropdown"
                        >
                            <span id="search_concept">{searchBy}</span>
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu" style={{cursor: "pointer"}}>
                            <li>
                                <p onClick={(e) => setsearchBy("Medicines")}
                                   className="dropdown-item text-decoration-none text-dark"
                                >
                                    Medicines
                                </p>
                            </li>
                            <li>
                                <p onClick={(e) => setsearchBy("Tests")}
                                   className="dropdown-item text-decoration-none text-dark"
                                >
                                    Tests
                                </p>
                            </li>
                        </ul>
                    </div>
                    <input
                        type="text"
                        className="form-control mr-sm-2"
                        placeholder="Search..."
                        value={text}
                        onChange={onChange}
                    />
                    {
                        data.length > 0 || text.length > 0 ?
                            <i className="fas fa-times" style={{
                                display: "inline",
                                backgroundColor: "white",
                                color: "#228B22",
                                cursor: "pointer",
                                padding: "1.5%"
                            }} onClick={(e) => clearSearch(e)}>&nbsp;</i> :
                            null
                    }

                    {/* <i class="fa fa-window-close" style={{display:"inline", backgroundColor:"black"}} onClick={(e) => clearItemsList()}></i> */}
                    <Link className="btn text-success" to="/meditems">
                        <i className="fa fa-search "></i>
                    </Link>
                </form>
                {
                    searchBy === 'Medicines' ?
                        <table className="drugList table table-striped m-0 shadow">
                            <tbody>
                            {data.map((items) => (
                                <tr key={items._id}>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: "/to/item",
                                                state: {
                                                    searchBy,
                                                    items: items
                                                },
                                            }}
                                            className="text-decoration-none secondary-text"
                                            onClick={() => ClearItemsList()}
                                        >
                                            {items.doctorPrescriptionName}
                                        </Link>
                                    </td>
                                    <td>₹{items.mrp}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        :
                        <table className="drugList table table-striped m-0 shadow">
                            <tbody>
                            {data.map((items) => (
                                <tr key={items._id}>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: "/to/item",
                                                state: {
                                                    searchBy,
                                                    items: items
                                                },
                                            }}
                                            className="text-decoration-none secondary-text"
                                            onClick={() => ClearItemsList()}
                                        >
                                            {items.TNAME1}
                                        </Link>
                                    </td>
                                    <td>₹{items.MRP}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                }

            </div>

            <div className="collapse navbar-collapse" id="navigation">
                <ul className="navbar-nav mr-2">
                    <li className="nav-item">
                        <Link to="/doctors" className="nav-link">
                            Doctor
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
                        {isAuthenticated ? (
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Hello, {userName}
                            </Link>
                        ) : (
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Hello, User
                            </Link>
                        )}
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="navbarDropdown"
                        >
                            {isAuthenticated ? (
                                <ul className="text-left">
                                    <Link
                                        className="nav-link text-dark text-decoration-none p-1 mx-2"
                                        to="/profile"
                                    >
                                        <i className="fas fa-user-circle mr-1 icon-primary"></i> Profile
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                        className="nav-link text-dark text-decoration-none p-1 mx-2"
                                        to="/yourOrders"

                                    >
                                        <i className="fas fa-shopping-bag mr-1 icon-primary"></i> Orders
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                        className="nav-link text-dark text-decoration-none p-1 mx-2"
                                        onClick={logout}
                                        to="/"
                                    >
                                        <i className="fas fa-sign-out-alt mr-1 icon-primary"></i> Logout
                                    </Link>
                                </ul>
                            ) : (
                                <Link className="dropdown-item" to="/login">
                                    <i className="fas fa-sign-in-alt"></i> Sign In
                                </Link>
                            )}
                        </div>
                    </li>

                    <li className="nav-item">
                        {
                            isAuthenticated
                                ? <Link to="/cart" className="nav-link">
                                    <i className="fas fa-shopping-cart mr-1 text-white"></i>
                                </Link>
                                : <Link to="/login" className="nav-link">
                                    <i className="fas fa-shopping-cart mr-1 text-white"></i>
                                </Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
};

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
export default connect(mapStateToProps, {logout, search, searchTests, clearItemsList})(
    Header
);
