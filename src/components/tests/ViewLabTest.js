import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../../actions/cartAction";

class ViewLabTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
    };
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="item-detail">
        <h1>
          {this.props.location.state.items.TNAME1}{" "}
          {this.props.location.state.items.TNAME2}{" "}
          {this.props.location.state.items.TNAME3}
        </h1>
        <div className="detail-name">
          {" "}
          <h2>Name:</h2>{" "}
          <p>
            {this.props.location.state.items.TNAME1}{" "}
            {this.props.location.state.items.TNAME2}{" "}
            {this.props.location.state.items.TNAME3}
          </p>
        </div>

        <div className="detail-name">
          {" "}
          <h2>Tcode:</h2> <p>{this.props.location.state.items.Tcode}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> METHOD:</h2> <p>{this.props.location.state.items.METHOD}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> MRP:</h2> <p>{this.props.location.state.items.MRP}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2>AMBIENT25C:</h2>{" "}
          <p>{this.props.location.state.items.AMBIENT25C}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2>R28C:</h2> <p>{this.props.location.state.items.R28C}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2>F20C:</h2> <p>{this.props.location.state.items.F20C}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> QUANTITY:</h2> <p>{this.props.location.state.items.QUANTITY}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> DEPARTMENT:</h2>{" "}
          <p>{this.props.location.state.items.DEPARTMENT}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> SECTION:</h2> <p>{this.props.location.state.items.SECTION}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> Cat:</h2> <p>{this.props.location.state.items.Cat}</p>{" "}
        </div>
        {isAuthenticated ? (
          <button
            className="item-but"
            onClick={this.props.addCart.bind(
              this,
              this.props.location.state.items._id,
              this.props.location.state.items.TNAME1,
              this.props.location.state.items.METHOD,
              parseInt(this.props.location.state.items.MRP),
              
            )}
          >
            Add to cart
          </button>
        ) : (
          <Link to="/login">
            <button className="item-but">Add to cart</button>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addCart })(ViewLabTest);
