import React, { Component, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import TestContext from '../../Context/testContext/TestContext'
import { addCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";

const AllTests = ({ auth, addCart }) => {
  const testContext = useContext(TestContext);

  const { alltest, fetchalltest } = testContext;
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    fetchalltest(currentPage, postsPerPage);
  }, [fetchalltest, postsPerPage, currentPage])
  if (currentPage < 0) {
    setCurrentPage(0);
  }
  // console.log(alltest)

  const { isAuthenticated } = auth;
  return (
    <div className="container my-4">
      <h5 className="font-weight-bold primary-heading">All Available Tests</h5>
      <hr />
      <div className="view_items row m-0">
        {alltest.map((test) => (
          <div key={test._id} className="col-lg-4 col-md-4 my-2">
            <div className="p-4 bg-white shadow-sm rounded-lg my-4">
              <Link
                to={{
                  pathname: "/labItem",
                  state: { items: test },
                }}
                className="primary-text text-decoration-none"
              >
                <h5 className="font-weight-bold">
                  {test.TNAME1} {test.TNAME2} {test.TNAME3}
                </h5>
              </Link>

              <p>{test.METHOD}</p>
              <div className="priceBtn">
                <p className="font-weight-bold">₹{test.MRP}</p>
                {isAuthenticated ? (
                  <div className="text-right">
                    <button
                      onClick={addCart.bind(
                        this,
                        test._id,
                        test.TNAME1,
                        test.METHOD,
                        parseInt(test.MRP),
                        test.Tcode,
                        "MedicalTest"
                      )}
                      className="button-primary mx-2"
                    >
                      Add to cart
                      </button>
                  </div>
                ) : (
                    <div className="text-right">
                      <Link to="/login">
                        <button className="button-primary mx-2">Add to cart</button>
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p>Page : <span className="text-info">{currentPage}</span></p>
        <button className="button-secondary mx-2" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <button className="button-secondary mx-2" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  tests: state.tests.allTests,
  auth: state.auth,
});
export default connect(mapStateToProps, { addCart })(AllTests);
