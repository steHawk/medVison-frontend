import React, { Component } from "react";

// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="bg-white py-4">
        <div className="container">
          <div className="text-center">
            <h1 className="primary-heading">Popular Tests</h1>
            <Link to="/super60" className="primary-text text-decoration-none">
                View All
            </Link>
          </div>
          <Carousel responsive={responsive}>
          {this.props.tests.map((test, index) => (
              <div key={index} className="testCard p-2 mx-2 shadow my-2">
                <h6 className="font-weight-bold">{test.TNAME1}</h6>
                <p></p>
                <div className="bookPrice">
                  <p>₹{test.MRP}</p>
                  {isAuthenticated ? (
                    <div className="text-center">
                      <button
                        className="button-test"
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
                        <button className="button-test">Add to cart</button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Carousel>
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
