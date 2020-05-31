import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllTests } from "../../actions/testsActions";

class AllTests extends Component {
  componentDidMount() {
    this.props.fetchAllTests();
  }
  render() {
    return (
      <div>
        <div className="view_items">
          <h1>Full Body Checkups</h1>
          {this.props.tests.map((test, index) => (
            <div key={index} className="inner_all">
              <h3>{test.name}</h3>
              <p>{test.desc}</p>
              <p>₹{test.price}</p>
              <button>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tests: state.tests.allTests,
});
export default connect(mapStateToProps, { fetchAllTests })(AllTests);
