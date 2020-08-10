import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap CSS
import "bootstrap/dist/js/bootstrap"; //Bootstrap CSS
import { connect } from "react-redux"; //Provider,
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
import ProfileUpdate from "./components/accounts/ProfileUpdate";
import ItemDetails from "./components/layout/ItemDetails";

import { loadUser } from "./actions/authActions";
import Conformation from "./components/booknow/Conformation";
import Prescription from "./components/layout/services/Prescription";
import ItemDetail from "./components/layout/ItemDetail";
import Billing from "./components/cart/Billing";
import ViewLabTest from "./components/tests/ViewLabTest";
import Super60 from "./components/layout/Super60";
import ApiState from './Context/ApiState'
import NotFound from './components/layout/NotFound'

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
      <ApiState>
        <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <div>
              <HeaderNav />
              <Alerts />
              <div id="content">
                <Fragment>
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/services" component={Service} />
                    <Route exact path="/medicine" component={Medicine} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/meditems" component={MedicineItems} />
                    <Route exact path="/specialist" component={Specialist} />
                    <Route exact path="/doctors" component={Doctors} />
                    <Route exact path="/conformation" component={Conformation} />
                    <Route exact path="/docConsult" component={ConsultForm} />
                    <Route exact path="/cart" component={UserCart} />
                    <Route exact path="/alltests" component={AllTests} />
                    <Route exact path="/login" component={LoginAuth} />
                    <Route exact path="/getotp" component={GetOtp} />
                    <Route exact path="/submitOtp" component={SubmitOtp} />
                    <Route exact path="/submitLoginOtp" component={SubmitOtp} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/otpLogin" component={GetOtp} />
                    <Route exact path="/profileUpdate" component={ProfileUpdate} />
                    <Route exact path="/prescription" component={Prescription} />
                    <Route exact path={`/checkout`} component={Billing} />
                    <Route exact path="/to/item" component={ItemDetail} />
                    <Route exact path="/labItem" component={ViewLabTest} />
                    <Route exact path="/super60" component={Super60} />
                    <Route component={NotFound} />
                  </Switch>
                </Fragment>
              </div>
              <Footer />
            </div>
          </Router>
        </AlertProvider>
      </ApiState>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(App);
