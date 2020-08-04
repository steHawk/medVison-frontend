import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPopularTests } from "../../actions/testsActions";
import { Link } from "react-router-dom";//, Redirect

import PropTypes from "prop-types";

import { addCart } from "../../actions/cartAction";

class Tests extends Component {
  static propTypes = {
    addCart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.fetchPopularTests();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="test_items my-2">
        <div className="testName">
          <h4 className="font-weight-bold">Popular Tests</h4>
          <Link to="/super60">
            <div className="view_all">
              <p>View All</p>
            </div>
          </Link>  
        </div>
        <div className="items_overflow row m-0 my-2">
          {this.props.tests.map((test, index) => (
            <div key={index} className="testCard col-lg-3 m-2 p-2 shadow rounded">
              <h6>{test.TNAME1}</h6>
              <p></p>
              <div className="bookPrice">
                <p>₹{test.MRP}</p>
                {isAuthenticated ? (
                  <div className="text-center">
                    <button
                      onClick={this.props.addCart.bind(
                      this,
                        test._id,
                        test.TNAME1,
                        "no discription",
                        parseInt(test.MRP),
                        test.testType,
                        "MedicalTest"
                    )}
                    >
                      Add to cart
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Link to="/login">
                      <button className="button-primary">Add to cart</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tests: state.tests.tests,
  auth: state.auth,
});
export default connect(mapStateToProps, { fetchPopularTests, addCart })(Tests);
