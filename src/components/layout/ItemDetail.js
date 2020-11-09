import React, { Component } from 'react'
import { getItem } from '../../actions/itemsActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../../actions/cartAction';




class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    // console.log(this.props.location.state)
    if(this.props.location.state.searchBy === 'Medicines'){
      return (
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
                  <p className="font-weight-bold secondary-text"> MRP (₹):</p>
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
              {isAuthenticated==="true" ? (
                  <tr><th>
                    <button
                        className="button-primary"
                        onClick={this.props.addCart.bind(
                            this,
                            this.props.location.state.items._id,
                            this.props.location.state.items.doctorPrescriptionName,
                            this.props.location.state.items.uses,
                            this.props.location.state.items.mrp,
                            this.props.location.state.items.packSize,
                            "Medicine",
                        )}
                    >
                      Add to cart
                    </button>
                  </th></tr>
              ) : (
                  <tr><th>
                    <Link to="/login">
                      <button className="button-primary">Add to cart</button>
                    </Link>
                  </th></tr>
              )}
              </tbody>
            </table>
          </div>
      )
    }else{
      return (
          <div className="container my-4">
            <h4 className="font-weight-bold primary-text">
              {this.props.location.state.items.TNAME1}
            </h4>
            <table className="table-item table table-responsive">
              <tbody>
              <tr>
                <td>
                  {" "}
                  <p className="font-weight-bold secondary-text">Name:</p>
                </td>
                <td>
                  <p>{this.props.location.state.items.TNAME1}</p>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <p className="font-weight-bold secondary-text">PREREQUESITES:</p>
                </td>
                <td>
                  <p>{this.props.location.state.items.ANALYTEDESCRIPTIONPREREQUESITES}</p>{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <p className="font-weight-bold secondary-text"> DEPARTMENT: </p>
                </td>
                <td>
                  <p>{this.props.location.state.items.DEPARTMENT}</p>{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <p className="font-weight-bold secondary-text"> MRP (₹):</p>
                </td>
                <td>
                  <p>{this.props.location.state.items.MRP}</p>{" "}
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
                  <p className="font-weight-bold secondary-text"> Test Schedule:</p>
                </td>
                <td>
                  <p>{this.props.location.state.items.Testschedule.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <p className="font-weight-bold secondary-text"> Reported On:</p>
                </td>
                <td>
                  <p>{this.props.location.state.items.Reportedon.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <p className="font-weight-bold secondary-text"> Is Fasting:</p>
                </td>
                <td>
                  <p>{this.props.location.state.items.IsFasting === null ? "No" : this.props.location.state.items.IsFasting}</p>{" "}
                </td>
              </tr>
              {isAuthenticated==="true" ? (
                  <tr><th>
                    <button
                        className="button-primary"
                        onClick={this.props.addCart.bind(
                            this,
                            this.props.location.state.items._id,
                            this.props.location.state.items.TNAME1,
                            this.props.location.state.items.ANALYTEDESCRIPTIONPREREQUESITES,
                            this.props.location.state.items.MRP,
                            this.props.location.state.items.QUANTITY,
                            "MedicalTest",
                        )}
                    >
                      Add to cart
                    </button>
                  </th></tr>
              ) : (
                  <tr><th>
                    <Link to="/login">
                      <button className="button-primary">Add to cart</button>
                    </Link>
                  </th></tr>
              )}
              </tbody>
            </table>
          </div>
      );
    }

  }
}


const mapStateToProps = (state) => ({

  auth: state.auth,

});

export default connect(mapStateToProps, { addCart, getItem })(ItemDetail);
