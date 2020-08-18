import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Confirmation extends Component {
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
      <div class="modal fade" id="Confirmed" tabindex="-1" role="dialog" aria-labelledby="ConfirmedTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Confirmed</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                Doctor Confirmation ID : <strong>{this.state.docTokenNumber}</strong> our customer
                support will call you back in 3 working hours Thank you..{" "}
              </p>
            </div>
            <div class="modal-footer">
              <Link to="/">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  docToken: state.doctors.doc_token,
});

export default connect(mapStateToProps, {})(Confirmation);
