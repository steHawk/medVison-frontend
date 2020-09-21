import React, { Component } from 'react'
import { Link } from "react-router-dom";
import HealthyIllustration from '../../assets/health.svg';

export class Welcome extends Component {
    render() {
        return (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="container">
                <div className="row m-0 pt-lg-4 pt-md-4">
                  <div className="col-lg-8 col-md-8 my-4">
                    <h5 className="m-0">Welcome to</h5>
                    <h2 className="secondary-text font-weight-bold text-uppercase">Medvision</h2>
                    <h6>Your One Stop for Online Pharmacy and Healthcare.</h6>
                    <div className="pr-5">
                      <p className="text-muted p-1">
                        Pharmacy Services are now easy! Order Medicines and Supplies, Doctor Consultation is now one click away. 
                      </p>
                    </div>
                    <Link className="secondary-text font-weight-bold p-1" to="/doctors"> <button className=" button-primary">Register Now!</button></Link>
                  </div>
                  <div className="col-lg-4 col-md-4 my-4">
                    <img src={HealthyIllustration} className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Welcome
