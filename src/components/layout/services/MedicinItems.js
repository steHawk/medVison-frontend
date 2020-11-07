import React from 'react'
import {fetchMedicineByCategory} from "../../../actions/medicineActions";
// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {addCart} from "../../../actions/cartAction";
// import ApiContext from '../../../Context/ApiContext'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
// import {
//     addCart,
//     quantity,
//     decrementQty,
//     incrementQty,
//     // getCartTotal
// } from "../../../actions/cartAction";

class MedicineItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            category: "",
        }
        this.responsive = {
            superLargeDesktop: {
                breakpoint: {max: 4000, min: 3000},
                items: 4
            },
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 4
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 3
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1
            }
        };
    }

    setCurrentPage(page) {
        if (page >= 0) {
            this.setState({
                currentPage: page,
            })
            this.props.fetchMedicineByCategory(this.state.category, page, 12);
        }
    }

    getMeds(category) {
        this.setState({
            category,
            currentPage: 0,
        })
        this.props.fetchMedicineByCategory(category, 0, 12);
    }

    render() {
        if (this.props.medicines.isMedicinesLoaded) {
            return (
                <div className="container my-4">
                    <div className="meds">
                        <Carousel responsive={this.responsive} className="text-center">
                            <button
                                onClick={(e) => this.getMeds('Prescription - Brand')}
                                className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm"
                            >
                                Prescription Medicines
                            </button>
                            <button
                                onClick={(e) => this.getMeds('OTC')}
                                className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm"
                            >
                                Over-the-counter (OTC)
                            </button>
                            <button
                                onClick={(e) => this.getMeds('Baby Care')}
                                className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm"
                            >
                                Baby Care
                            </button>
                            <button onClick={(e) => this.getMeds('Personal Care')}
                                    className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">
                                Personal Care
                            </button>
                            <button onClick={(e) => this.getMeds('supplements and wellness products')}
                                    className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">
                                Supplements & Wellness
                            </button>
                            <button onClick={(e) => this.getMeds('Medical & Surgical Devices')}
                                    className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">
                                Medical & Surgical
                                Devices
                            </button>
                            <button onClick={(e) => this.getMeds('Immune Booster')}
                                    className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">
                                Immunity Boosters
                            </button>
                            <button onClick={(e) => this.getMeds('Hand-Hygiene')}
                                    className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">
                                Hand - Hygiene
                            </button>
                            <button onClick={(e) => this.getMeds('')}
                                    className="btn btn-meditem bg-white rounded-pill my-4 p-2 px-4 shadow-sm">
                                See How It Works
                            </button>
                        </Carousel>
                        <hr/>
                        <div className="row m-0">
                            {this.props.medicines.medicines.map((med) => (
                                <div key={med._id} style={{display: "flex"}} className="meditems col-lg-3 col-md-4">
                                    <div className="p-4 bg-white shadow-sm rounded-lg my-4" data-aos="fade-up"
                                         data-aos-duration="1200">
                                        <div>
                                            <Link
                                                to={{
                                                    pathname: "/to/item",
                                                    state: {items: med},
                                                }}
                                                className="text-decoration-none"
                                            >
                                                <h6 className="font-weight-bold primary-text">{med.doctorPrescriptionName}</h6>
                                            </Link>
                                            <strong>Description : </strong>
                                            <p>{med.uses ? med.uses.replace(/(<([^>]+)>)/gi, "").slice(0, 52) : "Not Found"}</p>
                                            <strong>Package size : </strong> <p>{med.packSize}</p>
                                        </div>
                                        <div className="medBook">
                                            <p>Price : ₹{med.mrp}</p>

                                            {this.props.auth.isAuthenticated ? (
                                                <div className="text-center">
                                                    <button
                                                        className="button-primary"
                                                        onClick={this.props.addCart.bind(
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
                        <p>Page No. {this.state.currentPage + 1}</p>
                        <button className="button-secondary mx-2"
                                onClick={() => this.setCurrentPage(this.state.currentPage - 1)}>Previous
                        </button>
                        <button className="button-secondary mx-2"
                                onClick={() => this.setCurrentPage(this.state.currentPage + 1)}>Next
                        </button>
                    </div>
                </div>
            );
        } else {
            if (this.props.medicines.isMedicinesLoading) {
                return (
                    <div>
                        <p>
                            Loading...
                        </p>
                    </div>
                )
            } else {
                this.getMeds();
                return null;
            }
        }

    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    medicines: state.medicines
});

export default connect(mapStateToProps, {addCart, fetchMedicineByCategory})(
    MedicineItems
);
