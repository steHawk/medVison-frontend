import React, { Component } from "react";
// import { browserHistory } from 'react-router'
import {  Route, Switch, Redirect } from 'react-router-dom';//BrowserRouter as Router,
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap CSS
import "bootstrap/dist/js/bootstrap"; //Bootstrap CSS
import { connect } from "react-redux"; //Provider,
import store from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import TopBar from './components/layout/TopBar';
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
import GetOtp from "./components/accounts/GetOtp";
import SubmitOtp from "./components/accounts/SubmitOtp";
import Register from "./components/accounts/Register";
import Alerts from "./components/layout/Alerts";
import Doctors from "./components/layout/services/Doctors";
import Specialist from "./components/layout/services/Specialist";
import Medicine from "./components/layout/services/Medicine";
import MedicineItems from "./components/layout/services/MedicinItems";
import Profile from "./components/accounts/Profile";
import Orders from "./components/accounts/Orders";
import ProfileUpdate from "./components/accounts/ProfileUpdate";

import { loadUser } from "./actions/authActions";
import Prescription from "./components/layout/services/Prescription";
import ConfirmAddress from "./components/layout/services/ConfirmAddress";
import ItemDetail from "./components/layout/ItemDetail";
import Billing from "./components/cart/Billing";
import ViewLabTest from "./components/tests/ViewLabTest";
import Super60 from "./components/layout/Super60";
import ApiState from './Context/ApiState'
import TestState from './Context/testContext/Teststate'
import NotFound from './components/layout/NotFound'

// optional cofiguration
const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  isAuthenticated = this.props.auth.isAuthenticated;

  render() {
    return (
      <ApiState>
        <TestState>
          <AlertProvider template={AlertTemplate} {...options}>

              <div className='mainWrapper'>
                
                {!this.isAuthenticated ? <TopBar /> : <div></div>}

                <Header />
                <Alerts />

                <div id="content">
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/index.html" component={MainPage} />
                    <Route exact path="/about" component={About} />

                    {/* Services Routes */}
                    <Route exact path="/services" component={Service} />
                    <Route exact path="/medicine" component={Medicine} />
                    <Route exact path="/meditems" component={MedicineItems} />
                    <Route exact path="/specialist" component={Specialist} />
                    <Route exact path="/doctors" component={Doctors} />
                    <Route exact path="/docConsult" component={ConsultForm} />
                    <Route exact path="/alltests" component={AllTests} />
                    <Route exact path="/prescription" component={Prescription} />
                    <Route exact path="/to/item" component={ItemDetail} />
                    <Route exact path="/labItem" component={ViewLabTest} />
                    <Route exact path="/super60" component={Super60} />

                    {/* Auth Routes */}
                    <Route exact path="/login" component={LoginAuth} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/otpLogin" component={GetOtp} />
                    <Route exact path="/submitotp" component={SubmitOtp} />
                    <Route exact path="/submitLoginotp" component={SubmitOtp} />
                    <Route exact path="/getotp" component={GetOtp} />

                    {/* Private Routes */}
                    <Route exact path="/profile">
                      {(!this.isAuthenticated) ? <Redirect to="/login" /> : <Profile/>}
                    </Route>
                    <Route exact path="/cart" >
                      {(!this.isAuthenticated) ? <Redirect to="/login" /> : <UserCart/>}
                    </Route>
                    <Route exact path="/checkout">
                      {(!this.isAuthenticated) ? <Redirect to="/login" /> : <Billing/> }
                    </Route>
                    <Route exact path="/confirmAddress">
                      {(!this.isAuthenticated) ? <Redirect to="/login" /> : <ConfirmAddress/> }
                    </Route>
                    <Route exact path="/profileUpdate">
                      {(!this.isAuthenticated) ? <Redirect to="/login" /> : <ProfileUpdate/> }
                    </Route>
                    <Route exact path="/yourOrders" component={Orders} />

                    <Route component={NotFound} />
                  </Switch>

                </div>
                <Footer />
              </div>
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
