import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import  {getItems}  from "../../actions/itemsActions";


class Items extends Component {
  componentDidMount() {
    this.props.getItems();
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
            {this.props.items.map((test, index) => (
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
  items: state.items.items,
});
export default connect(mapStateToProps, { getItems })(Items);
