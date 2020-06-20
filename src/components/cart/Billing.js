import React, { Component } from "react";



export default class Billing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total_price: 0,
      discount_percentage: 20,
      discount_amount: 0,
      netamount: 0,
      collection_charges: 0,
      numofitems: [{}],
    }
  }

  

  checkout(e) {
    var tot=0;
    var len = this.props.cartItems.length;
    for(var i=0; i<len;i++){
      tot = parseInt(tot)+ parseInt(this.props.cartItems[i].price);
    }
    this.setState({
      total_price : tot,
      discount_amount : parseFloat( parseInt(tot) * parseInt(this.state.discount_percentage) /parseInt(100)),
      netamount : parseInt(parseInt(tot) - parseInt(parseFloat( parseInt(tot) * parseInt(this.state.discount_percentage) /parseInt(100))))

    })
  }

  render() {
    return (
      <div>
        <div className="bill">
          <p>PRICE DETAILS</p>
          <hr></hr>
          <div className="mrp">
            <div className="price">
              <p>Total MRP</p>
              <p>₹{this.state.total_price}</p>
            </div>
            <div className="price">
              <p>Total Discount</p>
              <p>- ₹{this.state.discount_amount}</p>
            </div>
          </div>
          <div className="charges">
            <p>Collection Charges</p>
            <p>{this.state.collection_charges}</p>
          </div>
          <hr></hr>
          <div className="total">
            <div className="total_save">
              <p>Total</p>
              <p>You save ₹{this.state.discount_amount} on your order!</p>
            </div>
            <div className="total_price">
              <p>₹{this.state.netamount}</p>
            </div>

          </div>
          <button onClick={(e) => this.checkout(e)}>Proceed to checkout</button>
        </div>
      </div>
    );
  }
}
