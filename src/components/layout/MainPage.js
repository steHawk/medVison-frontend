import React, { Component, Fragment } from "react";
import Tests from "../tests/Tests";
import BannerAdd from "./BannerAdd";
import BookNow from "./BookNow";
import HomePrescription from "./services/HomePrescription";
import MiniAboutUs from "./MiniAboutUs";


class MainPage extends Component {
  render() {
    return (
      <Fragment>
      <div className="banner-bg">
        <div className="container">
          <BannerAdd />
        </div>
      </div>
        <HomePrescription/>
      <div className="container">
        <BookNow />
      </div>
        <Tests />
      <div className="about mt-4">
        <MiniAboutUs />
      </div>
      </Fragment>
    );
  }
}

export default MainPage;
