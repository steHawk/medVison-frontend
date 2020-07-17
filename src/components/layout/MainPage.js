import React, { Component, Fragment } from "react";
import Tests from "../tests/Tests";
import BannerAdd from "./BannerAdd";
import BookNow from "./BookNow";
import HomePrescription from "./services/HomePrescription";


class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <BannerAdd />
        <HomePrescription/>
        <BookNow />
        <Tests />
      </Fragment>
    );
  }
}

export default MainPage;
