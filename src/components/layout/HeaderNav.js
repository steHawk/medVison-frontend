import React, { Component } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

class HeaderNav extends Component {
  render() {
    return (
      <div className="sticky-inner">
        <Header />
     
      <Navbar />
      </div>
    );
  }
}
export default HeaderNav;
