import React, { Component } from "react";

class NavSearch extends Component {
  render() {
    return (
      <div className="search">
        <input type="text" placeholder="Search for test" />
        <div className="search-icon">
        <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default NavSearch;
