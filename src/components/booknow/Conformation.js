import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Conformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
     docTokenNumber :""
    };
  }
  
  componentDidMount() {
    this.setState({ docTokenNumber: this.props.docToken });
  }

  render() {
    return (
      <div className="call_back">
        <p>
          Doctor Confirmation ID : <strong>{this.state.docTokenNumber}</strong> our customer
          support will call you back in 3 working hours Thank you..{" "}
        </p>

        <Link to="/">
          <div className="docBut">
            <p>OK</p>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  docToken: state.doctors.doc_token,
});

export default connect(mapStateToProps, {})(Conformation);
