import React, { useContext, useState, useEffect } from 'react'

// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import ApiContext from '../../../Context/ApiContext'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addCart,
  quantity,
  decrementQty,
  incrementQty,
  getCartTotal
} from "../../../actions/cartAction";
const MedicineItems = ({ auth, addCart }) => {

  const apiContext = useContext(ApiContext);

  const { current, getmed } = apiContext;
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(12);
  const [cartvalue, setcartvalue] = useState(0);

  useEffect(() => {
    getmed(postsPerPage, currentPage);
    decrementQty(quantity, cartvalue);
    incrementQty(quantity, cartvalue);
  }, [getmed, postsPerPage, currentPage])
  if (currentPage < 0) {
    setCurrentPage(0);
  }
  if (cartvalue < 0) {
    setcartvalue(0);
  }


  const { isAuthenticated } = auth;
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="container my-4">
      <div className="meds">
        <Carousel responsive={responsive} className="text-center">
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Prescription Medicines</button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Over-the-counter (OTC)</button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Baby Care</button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Personal Care</button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Supplements & Wellness</button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Medical & Surgical Devices</button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Immunity Boosters </button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">Hand - Hygiene</button>
          <button className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">See How It Works</button>
        </Carousel>
        <hr />
        <div className="row m-0">
          {current.map((med) => (
            <div key={med._id} className="meditems col-lg-3 col-md-4">
              <div className="p-4 bg-white shadow-sm rounded-lg my-4" data-aos="fade-up" data-aos-duration="1200">
                <div>
                  <Link
                    to={{
                      pathname: "/to/item",
                      state: { items: med },
                    }}
                    className="text-decoration-none"
                  >
                    <h6 className="font-weight-bold primary-text">{med.doctorPrescriptionName}</h6>
                  </Link>
                  <strong>Description : </strong>
                  <p>{med.uses.replace(/(<([^>]+)>)/gi, "").slice(0, 52)}</p>
                  <strong>Package size : </strong> <p>{med.packSize}</p>
                </div>
                <div className="medBook">
                  <p>₹{med.mrp}</p>
                  <strong>Quantity :</strong>
                  <div class="row m-0 mt-2 mb-4">
                    <div class="col-6">
                      <input
                        type="text"
                        value={quantity(med._id)}
                        class="form-control"
                        readOnly={true}
                      />
                    </div>
                    <div className="col-3">
                      <button
                        class="btn btn-outline-danger rounded-circle"
                        onClick={() => setcartvalue(cartvalue - 1)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <div className="col-3">
                      <button
                        class="btn btn-outline-primary rounded-circle"
                        onClick={() => setcartvalue(cartvalue + 1)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {isAuthenticated ? (
                    <div className="text-center">
                      <button
                        className="button-primary"
                        onClick={addCart.bind(
                          this,
                          med._id,
                          med.doctorPrescriptionName,
                          med.uses,
                          med.mrp,
                          med.packSize,
                          "Medicine"
                        )}
                      >
                        Add to cart
                      </button>
                    </div>
                  ) : (
                      <div className="text-center">
                        <Link to="/login">
                          <button className="button-primary mb-0">Add to cart</button>
                        </Link>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Page No. {currentPage}</p>
        <button className="button-secondary mx-2" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <button className="button-secondary mx-2" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addCart })(
  MedicineItems
);
