import React, { Component } from "react";
import { getSuper60 } from "../../actions/testsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../../actions/cartAction";



class Super60 extends Component {
  componentDidMount() {
    this.props.getSuper60();
  }

  render() {
    // console.log(this.props.super60);
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container my-4">
        <h4 className="font-weight-bold">Super60 Tests</h4>
        <hr />
        <div className="view_items row m-0">
          {this.props.super60.map((test, index) => (
            <div key={index} className="inner_all col-lg-4 col-md-4">
              <div className="p-4 bg-white shadow-sm rounded-lg my-4" data-aos="fade-up" data-aos-duration="1200">
                <h5 className="font-weight-bold">
                  {test.TNAME1} 
                </h5>
                <div className="priceBtn">
                  <p className="font-weight-bold">₹{test.MRP}</p>
                  {isAuthenticated ? (
                    <div className="text-right">
                    <button
                      onClick={this.props.addCart.bind(
                        this,
                          test._id,
                          test.TNAME1,
                          "no discription",
                          parseInt(test.MRP),
                          test.testType,
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  super60: state.tests.super60,
  auth: state.auth,
});
export default connect(mapStateToProps, { getSuper60 , addCart})(Super60);
