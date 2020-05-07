import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
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
import SubmitOtp from "./components/accounts/SubmitOtp";
import Register from "./components/accounts/Register";
import Alerts from "./components/layout/Alerts";

import { loadUser } from "./actions/authActions";

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <Fragment>
              <HeaderNav />
              <Alerts />
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Service} />
                <Route path="/medtestform" component={TestForm} />
                <Route path="/docConsult" component={ConsultForm} />
                <Route path="/medhome" component={MedForm} />
                <Route path="/cart" component={UserCart} />
                <Route path="/viewall" component={ViewAll} />
                <Route path="/login" component={LoginAuth} />
                <Route path="/getotp" component={GetOtp} />
                <Route path="/submitOtp" component={SubmitOtp} />
                <Route path="/register" component={Register} />
              </Switch>
              <Footer />
            </Fragment>
          </BrowserRouter>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
