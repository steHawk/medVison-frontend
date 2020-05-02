import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import HeaderNav from "./components/layout/HeaderNav";
import About from "./components/layout/About";
import Footer from "./components/layout/Footer";
import Service from "./components/layout/Services";
import MainPage from "./components/layout/MainPage";
import TestForm from "./components/booknow/TestForm";
import ConsultForm from "./components/booknow/ConsultForm";
import MedForm from "./components/booknow/MedForm";
import UserCart from "./components/cart/UserCart";
import ViewAll from "./components/tests/ViewAll";
import LoginAuth from "./components/accounts/LayoutAuth";
// import Register from "./components/accounts/Register";
import GetOtp from "./components/accounts/GetOtp";




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <HeaderNav />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/services" component={Service} />
              <Route exact path="/medtestform" component={TestForm} />
              <Route exact path="/docConsult" component={ConsultForm} />
              <Route exact path="/medhome" component={MedForm} />
              <Route exact path="/cart" component={UserCart} />
              <Route exact path="/viewall" component={ViewAll} />
              <Route exact path="/login" component={LoginAuth} />
              <Route exact path="/register" component={GetOtp} />
            </Switch>
            <Footer />
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
