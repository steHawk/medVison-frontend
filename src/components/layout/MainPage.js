import React, { Component, Fragment } from "react";
import Items from "../tests/Items";
import Tests from "../tests/Tests";
import BannerAdd from "./BannerAdd";
import BookNow from "./BookNow";

class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <BannerAdd />
        <BookNow />
        <Items />
        <Tests />
      </Fragment>
    );
  }
}

export default MainPage;
