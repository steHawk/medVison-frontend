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
      <div>
        <div className="test_items">
          <div className="testName">
            <b>Popular Tests</b>
            <Link to="/super60">
              <div className="view_all">
                <p>View All</p>
              </div>
            </Link>  
          </div>
          <div className="items_overflow">
            {this.props.tests.map((test, index) => (
              <div key={index} className="testCard">
                <h4>{test.TNAME1}</h4>
                <p></p>
                <div className="bookPrice">
                  <p>₹{test.MRP}</p>
                  {isAuthenticated ? (
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
                  ) : (
                    <Link to="/login">
                      <button>Add to cart</button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
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
