import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addCart } from "../../actions/cartAction";
import auth from "../../reducers/auth";

function ItemDetails(props, {auth}) {
  const state = {
    item_id: props.match.params.id,
    items: [],
    dataloaded: false,
  };

  const [item_id] = useState(state.item_id);
  const [items, setItems] = useState(state.items);
  const [dataloaded, setDataLoaded] = useState(state.dataloaded);

  useEffect(() => {
    const getItems = async () => {
      //console.log("p1", dataloaded);
      let requrl = "https://api.emetroplus.com/drug/";
      let data = { drug_id: item_id };
      fetch(requrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          if (data.ok && data) {
            //console.log("p2", dataloaded);

            setItems(data.drug_details);
            setDataLoaded(true);
            //console.log("p3", dataloaded);
          }
        });
    };
    getItems();
  }, [item_id]);
  //console.log(item_id);


  console.log(auth)

  return dataloaded ? (
      
    <div className="item-detail">
      <div className="detail-name">
        {" "}
        <h2>Name:</h2> <p>{items.doctorPrescriptionName}</p>
      </div>

      <div className="detail-name">
        {" "}
        <h2> Primarily Used For:</h2> <p>{items.primarilyUsedFor}</p>{" "}
      </div>
      <div className="detail-name">
        {" "}
        <h2> Product Type:</h2> <p>{items.productType}</p>{" "}
      </div>
      <div className="detail-name">
        {" "}
        <h2> MRP:</h2> <p>{items.mrp}</p>{" "}
      </div>
      <div className="detail-name">
        {" "}
        <h2> Pack Size:</h2> <p>{items.packSize}</p>{" "}
      </div>
      <div className="detail-name">
        {" "}
        <h2> How It Works:</h2> <p>{items.howItWorks}</p>{" "}
      </div>
      <div className="detail-name">
        {" "}
        <h2> uses:</h2> <p>{items.uses}</p>{" "}
      </div>
      <div className="detail-name">
        {" "}
        <h2> PrimarilyUsedFor:</h2> <p>{items.primarilyUsedFor}</p>{" "}
      </div>
      {0 == 0 ? (
        <button
          className="addb"
          onClick={this.props.addCart.bind(
            this,
            items._id,
            items.doctorPrescriptionName,
            items.uses,
            items.mrp,
            "Medicine"
          )}
        >
          Add to cart
        </button>
      ) : (
        <Link to="/login">
          <button className="addb">Add to cart</button>
        </Link>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

function mapStateToProps(state) {
    return { auth: state.auth };
  } 
export default connect(mapStateToProps, { addCart })(ItemDetails);



