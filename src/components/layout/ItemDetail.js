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

        return  <div className="item-detail">
        <h1>{this.props.location.state.items.doctorPrescriptionName}</h1>
        <div className="detail-name">
        
          {" "}
          <h2>Name:</h2> <p>{this.props.location.state.items.doctorPrescriptionName}</p>
        </div>
  
        <div className="detail-name">
          {" "}
          <h2> Primarily Used For:</h2> <p>{this.props.location.state.items.primarilyUsedFor}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> Product Type:</h2> <p>{this.props.location.state.items.productType}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> MRP:</h2> <p>{this.props.location.state.items.mrp}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> Pack Size:</h2> <p>{this.props.location.state.items.packSize}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> How It Works:</h2> <p>{this.props.location.state.items.howItWorks.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> uses:</h2> <p>{this.props.location.state.items.uses.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> Primarily Used For:</h2> <p>{this.props.location.state.items.primarilyUsedFor}</p>{" "}
        </div>
        {isAuthenticated ? (
          <button
            className="item-but"
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
            <button className="item-but">Add to cart</button>
          </Link>
        )}
      </div>
              
    }
}

const mapStateToProps = (state) => ({
    
    auth: state.auth,

  });

export default connect(mapStateToProps, {addCart, getItem})(ItemDetail);
