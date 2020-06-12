import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllTests } from "../../actions/testsActions";
import { addCart } from "../../actions/cartAction";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


class AllTests extends Component {
  static propTypes = {
    addCart: PropTypes.func.isRequired,
  };


  componentDidMount() {
    this.props.fetchAllTests();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="allt">
                  <h1>All Available Tests</h1>
        <div className="view_items">

          {this.props.tests.map((test, index) => (
            <div key={index} className="inner_all">
              <h3>{test.name}</h3>
              <p>{test.desc}</p>
              <div className="priceBtn">
                <p>₹{test.price}</p>
                {isAuthenticated ? (
                  <button
                    onClick={this.props.addCart.bind(
                      this,
                      test._id,
                      test.name,
                      test.desc,
                      test.price,
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
    );
  }
}

const mapStateToProps = (state) => ({
  tests: state.tests.allTests,
  auth: state.auth,

});
export default connect(mapStateToProps, { fetchAllTests, addCart })(AllTests);
