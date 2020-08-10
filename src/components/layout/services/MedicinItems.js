import React, { useContext, useState, useEffect } from 'react'
import ApiContext from '../../../Context/ApiContext'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../../../actions/cartAction";
const MedicineItems = ({ auth }) => {

  const apiContext = useContext(ApiContext);

  const { current, getmed } = apiContext;
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    getmed(postsPerPage, currentPage);
  }, [getmed, postsPerPage, currentPage])
  if (currentPage < 0) {
    setCurrentPage(0);
  }


  const { isAuthenticated } = auth;

  return (
    <div className="container my-4">
      <div className="meds">
        <h4 className="font-weight-bold">Prescription Medicine</h4>
        <hr />
        <div className="row m-0">
          {current.map((med) => (
            <div key={med._id} className="meditems col-lg-3 col-md-4 my-2">
              <div className="p-2 shadow rounded">
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
                  {isAuthenticated ? (
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
                  ) : (
                      <div className="text-right m-1">
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
        <button className="button-primary mx-2" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <button className="button-primary mx-2" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
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
