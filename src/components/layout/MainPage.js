import React, { Component, Fragment } from "react";
import Tests from "../tests/Tests";
import BannerAdd from "./BannerAdd";
import BookNow from "./BookNow";
import HomePrescription from "./services/HomePrescription";
import MiniAboutUs from "./MiniAboutUs";
import Welcome from "./Welcome";


class MainPage extends Component {

  isAuthenticated = localStorage.getItem('token');
  
  render() {
    return (
      <Fragment>

      {/* Banner */}
      <div className="banner-bg">
        <div className="container">
          <BannerAdd />
        </div>
      </div>

      {/* Welcome Section */}
      {!this.isAuthenticated ? <Welcome /> : <div></div>}
    
      {/* Serivces */}
      <div className="container">
        <BookNow />
      </div>

      {/* Our Services */}
      <HomePrescription/>

      {/* Popular Tests */}
      <Tests />

      <MiniAboutUs />

      </Fragment>
    );
  }
}

export default MainPage;
