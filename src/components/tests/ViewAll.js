import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTests } from "../../actions/testsActions";

class ViewAll extends Component {
  componentDidMount() {
    this.props.fetchTests();
  }
  render() {
    return (
      <div>
        <div className="view_items">
          <h1>Full Body Checkups</h1>
          {this.props.tests.map((test, index) => (
            <div className="inner_all">
              <h3>{test.title}</h3>
              <p>{test.discription}</p>
              <p>₹795</p>
              <button>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tests: state.tests.tests,
});
export default connect(mapStateToProps, { fetchTests })(ViewAll);
