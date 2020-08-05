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
      <div className="container my-4">
        <h4 className="font-weight-bold primary-text">
          {this.props.location.state.items.TNAME1}{" "}
          {this.props.location.state.items.TNAME2}{" "}
          {this.props.location.state.items.TNAME3}
        </h4>
        <table className="table-item table table-responsive">
          <tbody>
            <tr>
              <td>
                {" "}
                <p className="font-weight-bold secondary-text">Name:</p>{" "}
              </td>
              <td>
                <p>
                  {this.props.location.state.items.TNAME1}{" "}
                  {this.props.location.state.items.TNAME2}{" "}
                  {this.props.location.state.items.TNAME3}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <p className="font-weight-bold secondary-text">Tcode:</p> 
              </td>
              <td>
                <p>{this.props.location.state.items.Tcode}
                </p>{" "}
              </td>
            </tr>
            <tr>
                <td>
                  {" "}
                  <p className="font-weight-bold secondary-text"> METHOD:</p>
                </td>
                <td>
                  <p>{this.props.location.state.items.METHOD}
                  </p>{" "}
                </td> 
            </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text"> MRP:</p> 
            </td>
            <td>
              <p>{this.props.location.state.items.MRP}</p>{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text">AMBIENT25C:</p>{" "}
            </td>
            <td>
              <p>{this.props.location.state.items.AMBIENT25C}</p>{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text">R28C:</p> 
            </td>
            <td>
              <p>{this.props.location.state.items.R28C}</p>{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text">F20C:</p> 
            </td>
            <td>
              <p>{this.props.location.state.items.F20C}</p>{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text"> QUANTITY:</p> 
            </td>
            <td>
              <p>{this.props.location.state.items.QUANTITY}</p>{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text"> DEPARTMENT:</p>{" "}
            </td>
            <td>
              <p>{this.props.location.state.items.DEPARTMENT}</p>{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text"> SECTION:</p> 
            </td>
            <td>
              <p>{this.props.location.state.items.SECTION}</p>{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="font-weight-bold secondary-text"> Cat:</p> 
            </td>
            <td>
              <p>{this.props.location.state.items.Cat}</p>{" "}
            </td>
          </tr>
          </tbody>
        </table>
        {isAuthenticated ? (
          <button
            className="button-primary"
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
            <button className="button-primary">Add to cart</button>
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
