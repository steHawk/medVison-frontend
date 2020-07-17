import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllTests } from "../../actions/testsActions";
import { addCart } from "../../actions/cartAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AllTests extends Component {
  static propTypes = {
    addCart: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({ skip: this.state.skip + 10, limit: this.state.limit + 10 });
    console.log(this.state);
    this.props.fetchAllTests(this.state.skip, this.state.limit);
  }

  decrement() {
    this.setState({ skip: this.state.skip - 10, limit: this.state.limit - 10 });
    console.log(this.state);
    this.props.fetchAllTests(this.state.skip, this.state.limit);
  }

  componentDidMount() {
    this.props.fetchAllTests(this.state.skip, this.state.limit);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="allt">
        <h1>All Available Tests</h1>
        <div className="view_items">
          {this.props.tests.map((test, index) => (
            <div key={index} className="inner_all">
              <Link
                to={{
                  pathname: "/labItem",
                  state: { items: test },
                }}
              >
                <h3>
                  {test.TNAME1} {test.TNAME2} {test.TNAME3}
                </h3>
              </Link>

              <p>{test.METHOD}</p>
              <div className="priceBtn">
                <p>₹{test.MRP}</p>
                {isAuthenticated ? (
                  <button
                    onClick={this.props.addCart.bind(
                      this,
                        test._id,
                        test.TNAME1,
                        test.METHOD,
                        parseInt(test.MRP),
                        test.Tcode,
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
        <div className="loadmore">
          <button onClick={this.decrement}>Previous</button>
          <button onClick={this.increment}>Next</button>
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
