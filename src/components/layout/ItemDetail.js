import React, { Component } from 'react'
import { getItem } from '../../actions/itemsActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../../actions/cartAction';




class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
        item :[],
    }
}

  render() {
      const { isAuthenticated } = this.props.auth;

      return  (
      <div className="container my-4">
        <h4 className="font-weight-bold primary-text">
          {this.props.location.state.items.doctorPrescriptionName}
        </h4>
        <table className="table-item table table-responsive">
          <tbody>
            <tr>
              <td>
                {" "}
                <p className="font-weight-bold secondary-text">Name:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.doctorPrescriptionName}</p>
              </td>
            </tr>
            <tr>
              <td>
              {" "}
              <p className="font-weight-bold secondary-text"> Primarily Used For:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.primarilyUsedFor}</p>{" "}
              </td>
            </tr>
            <tr>
              <td>
              {" "}
                <p className="font-weight-bold secondary-text"> Product Type:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.productType}</p>{" "}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <p className="font-weight-bold secondary-text"> MRP:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.mrp}</p>{" "}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <p className="font-weight-bold secondary-text"> Pack Size:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.packSize}</p>{" "}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <p className="font-weight-bold secondary-text"> How It Works:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.howItWorks.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
              </td>
            </tr>
            <tr>
              <td>
              {" "}
                <p className="font-weight-bold secondary-text"> uses:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.uses.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <p className="font-weight-bold secondary-text"> Primarily Used For:</p>
              </td>
              <td>
                <p>{this.props.location.state.items.primarilyUsedFor}</p>{" "}
              </td>
            </tr>
          {isAuthenticated ? (
            <button
              className="button-primary"
              onClick={this.props.addCart.bind(
                this,
                this.props.location.state.items._id,
                this.props.location.state.items.doctorPrescriptionName,
                this.props.location.state.items.uses,
                this.props.location.state.items.mrp,
                "Medicine"
              )}
            >
              Add to cart
            </button>
          ) : (
            <Link to="/login">
              <button className="button-primary">Add to cart</button>
            </Link>
          )}
          </tbody>
        </table>
      </div>     
    )
  }
}

const mapStateToProps = (state) => ({
    
    auth: state.auth,

  });

export default connect(mapStateToProps, {addCart, getItem})(ItemDetail);
