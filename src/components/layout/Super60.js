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
        <div className="allt">
        <h1>Super60 Tests</h1>
        <div className="view_items">
          {this.props.super60.map((test, index) => (
            <div key={index} className="inner_all">
        
                <h3>
                  {test.TNAME1} 
                </h3>
       
              <div className="priceBtn">
                <p>₹{test.MRP}</p>
                {isAuthenticated ? (
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
                  >
                    Add to cart
                  </button>
                ) : (
                  <Link to="/login">
                    <button>Add to cart</button>
                  </Link>
                )}
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
