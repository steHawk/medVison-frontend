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
      <div className="container my-4">
        <h4 className="font-weight-bold">All Available Tests</h4>
        <hr />
        <div className="view_items row m-0">
          {this.props.tests.map((test, index) => (
            <div key={index} className="inner_all col-lg-6 col-md-6 my-2">
              <div className="p-2 shadow rounded">
                <Link
                  to={{
                    pathname: "/labItem",
                    state: { items: test },
                  }}
                  className="primary-text text-decoration-none"
                >
                  <h5 className="font-weight-bold">
                    {test.TNAME1} {test.TNAME2} {test.TNAME3}
                  </h5>
                </Link>

                <p>{test.METHOD}</p>
                <div className="priceBtn">
                  <p className="font-weight-bold">₹{test.MRP}</p>
                  {isAuthenticated ? (
                    <div className="text-right">
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
                        className="button-primary mx-2"
                      >
                        Add to cart
                      </button>
                    </div>
                  ) : (
                    <div className="text-right">
                      <Link to="/login">
                        <button className="button-primary mx-2">Add to cart</button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button onClick={this.decrement} className="button-secondary mx-2">Previous</button>
          <button onClick={this.increment} className=" button-secondary mx-2">Next</button>
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
