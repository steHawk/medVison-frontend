import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider, connect } from "react-redux";
import store from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import HeaderNav from "./components/layout/HeaderNav";
import About from "./components/layout/About";
import Footer from "./components/layout/Footer";
import Service from "./components/layout/Services";
import MainPage from "./components/layout/MainPage";
// import TestForm from "./components/booknow/TestForm";
import ConsultForm from "./components/booknow/ConsultForm";
import UserCart from "./components/cart/UserCart";
import AllTests from "./components/tests/AllTests";
import LoginAuth from "./components/accounts/LayoutAuth";
// import Register from "./components/accounts/Register";
import GetOtp from "./components/accounts/GetOtp";
import SubmitOtp from "./components/accounts/SubmitOtp";
import Register from "./components/accounts/Register";
import Alerts from "./components/layout/Alerts";
import Doctors from "./components/layout/services/Doctors";
import Specialist from "./components/layout/services/Specialist";
import Medicine from "./components/layout/services/Medicine";
import MedicineItems from "./components/layout/services/MedicinItems";
import Profile from "./components/accounts/Profile";

import { loadUser } from "./actions/authActions";
import Conformation from "./components/booknow/Conformation";



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
      // <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <div>
              <HeaderNav />
              <Alerts />
              <div id="content">
                <Fragment>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Service} />
                <Route path="/medicine" component={Medicine} />
                <Route path="/profile" component={Profile} />
                <Route path="/meditems" component={MedicineItems} />
                <Route path="/specialist" component={Specialist} />
                <Route path="/doctors" component={Doctors} />
                <Route path="/conformation" component={Conformation} />
                <Route path="/docConsult" component={ConsultForm} />
                <Route path="/cart" component={UserCart} />
                <Route path="/alltests" component={AllTests} />
                <Route path="/login" component={LoginAuth} />
                <Route path="/getotp" component={GetOtp} />
                <Route path="/submitOtp" component={SubmitOtp} />
                <Route path="/register" component={Register} />
              </Switch>
              </Fragment>
             </div>
              <Footer />
            </div>
          </BrowserRouter>
        </AlertProvider>
      // </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(App);
