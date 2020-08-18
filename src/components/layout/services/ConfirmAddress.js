import React, { Component } from 'react'

// import PropTypes from "prop-types";
import axios from "axios";
import {
  prescription,
  addressError,
} from "../../../actions/medicineActions";
import { Redirect } from "react-router-dom";

class ConfirmAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hno: JSON.parse(localStorage.getItem("shippingAddress")).doorNo,
			street: JSON.parse(localStorage.getItem("shippingAddress")).street,
			pinCode: JSON.parse(localStorage.getItem("shippingAddress")).pincode,
			city: JSON.parse(localStorage.getItem("shippingAddress")).city,
		};
	}

	onSubmit = (e) => {
    e.preventDefault();
	 if (this.state.hno === "" || this.state.street === "") {
      this.props.addressError();
    } else {
      const { hno, street, pinCode, city } = this.state;
      const prescription = {
        hno,
        street,
        pinCode,
        city,
      }
		this.props.prescription(prescription);
			console.log(prescription);
	}
	};
	render() {
		const { hno, street, pinCode, city } = this.state;
		return (
			<div className="container my-4">
        		<form onSubmit={this.onSubmit}>
					<p className="font-weight-bold">
						<i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
						Confirm Your Delivery location
					</p>
					<div className="form-group">
					 	<label>House / Flat Number</label>
						<input
							className="form-control mb-2"
							type="text"
							name="hno"
							onChange={this.onChange}
							value={hno}
						/>
						<label>Street</label>
						<input
							className="form-control mb-2"
							type="text"
							name="street"
							onChange={this.onChange}
							value={street}
						/>
						<label>Pin Code</label>
						<input
							className="form-control mb-2"
							type="number"
							name="pinCode"
							onChange={this.onChange}
							value={pinCode}
						/>
						<label>City</label>
						<input
							className="form-control mb-2"
							type="text"
							name="city"
							onChange={this.onChange}
							value={city}
						/>
					</div>
					<div className="text-right mt-4 mb-2">
						<button type="submit" className="button-primary">
						 	Confirm your order{" "}
						 	<i className="fa fa-angle-right fa-inverse"
							aria-hidden="true"></i>
						</button>
					</div>
        		</form>
			</div>
		);
	}
}

export default ConfirmAddress