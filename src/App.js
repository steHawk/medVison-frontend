import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap CSS
import "bootstrap/dist/js/bootstrap"; //Bootstrap CSS
import { connect } from "react-redux"; //Provider,
import store from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Header from "./components/layout/Header";
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
import TestState from './Context/testContext/Teststate'
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
        <TestState>
          <AlertProvider template={AlertTemplate} {...options}>
            <Router>
              <div>
                <Header />
                <Alerts />
                <div id="content">

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
                    <Route path="/submitLoginOtp" component={SubmitOtp} />
                    <Route path="/register" component={Register} />
                    <Route path="/otpLogin" component={GetOtp} />
                    <Route path="/profileUpdate" component={ProfileUpdate} />
                    <Route path="/prescription" component={Prescription} />
                    <Route path={`/checkout`} component={Billing} />
                    <Route path="/to/item" component={ItemDetail} />
                    <Route path="/labItem" component={ViewLabTest} />
                    <Route path="/super60" component={Super60} />
                    <Route component={NotFound} />
                  </Switch>

                </div>
                <Footer />
              </div>
            </Router>
          </AlertProvider>
        </TestState>
      </ApiState>

    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(App);
