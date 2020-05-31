import React, { Component, Fragment } from "react";
import Tests from "../tests/Tests";
import BannerAdd from "./BannerAdd";
import BookNow from "./BookNow";

class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <BannerAdd />
        <BookNow />
        <Tests />
      </Fragment>
    );
  }
}

export default MainPage;
