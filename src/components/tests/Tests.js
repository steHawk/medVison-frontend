import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTests } from "../../actions/testsActions";
import { Link } from "react-router-dom";

class Tests extends Component {
  componentDidMount() {
    this.props.fetchTests();
  }

  render() {
    return (
      <div>
        <div className="test_items">
          <div className="testName">
            <p>Full Body Checkups</p>
            <Link to="/viewall">
              <div className="view_all">
                <p>View All</p>
              </div>
            </Link>
          </div>
          <div className="items_overflow">
            {this.props.tests.map((test, index) => (
              <div key={index} className="testCard">
                <h4>{test.title}</h4>
                <p>{test.discription}</p>
                <div className="bookPrice">
                  <p>{test.price}</p>
                  <button>Book Now</button>
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
});
export default connect(mapStateToProps, { fetchTests })(Tests);
