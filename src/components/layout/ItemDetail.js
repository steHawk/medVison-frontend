import React, { Component } from 'react'
import { getItem } from '../../actions/itemsActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../../actions/cartAction';




class ItemDetail extends Component {
    state = {
        items : "empty"
    }
    componentDidMount() {
        this.props.getItem(this.props.match.params.id);
        // console.log(this.props.match.params.id)
        setTimeout(() => {
            this.setState({ items: this.props.itemDetail });
            console.log(this.state.items)
          }, 2000);
          console.log()
   }

   

    render() {
        const { isAuthenticated } = this.props.auth;

        return this.state.items === "empty" ? (
           <div> ...loading</div>
        ) : (   <div className="item-detail">
        <h1>{this.state.items.itemDetail.doctorPrescriptionName}</h1>
        <div className="detail-name">
        
          {" "}
          <h2>Name:</h2> <p>{this.state.items.itemDetail.doctorPrescriptionName}</p>
        </div>
  
        <div className="detail-name">
          {" "}
          <h2> Primarily Used For:</h2> <p>{this.state.items.itemDetail.primarilyUsedFor}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> Product Type:</h2> <p>{this.state.items.itemDetail.productType}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> MRP:</h2> <p>{this.state.items.itemDetail.mrp}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> Pack Size:</h2> <p>{this.state.items.itemDetail.packSize}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> How It Works:</h2> <p>{this.state.items.itemDetail.howItWorks.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> uses:</h2> <p>{this.state.items.itemDetail.uses.replace(/(<([^>]+)>)/gi, "")}</p>{" "}
        </div>
        <div className="detail-name">
          {" "}
          <h2> Primarily Used For:</h2> <p>{this.state.items.itemDetail.primarilyUsedFor}</p>{" "}
        </div>
        {isAuthenticated ? (
          <button
            className="item-but"
            onClick={this.props.addCart.bind(
              this,
              this.state.items.itemDetail._id,
              this.state.items.itemDetail.doctorPrescriptionName,
              this.state.items.itemDetail.uses,
              this.state.items.itemDetail.mrp,
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
              )
    }
}

const mapStateToProps = (state) => ({
    itemDetail: state.itemDetail,
    auth: state.auth,

  });

export default connect(mapStateToProps, {addCart, getItem})(ItemDetail);
