import React, { Component } from "react";
import { fetchMedicineByType } from "../../../actions/medicineActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addCart } from "../../../actions/cartAction";


class HomePrescription extends Component {
    static propTypes = {
        fetchMedicineByType: PropTypes.func.isRequired,
        addCart: PropTypes.func.isRequired,

    };

    render() {
        return (
            <div className="medhome">             
                <div className="medP"> 
                    <p>Have Doctor Prescription ?</p>
                    <Link to="/prescription">
                        <button className="addb">Upload Prescription</button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, {})(HomePrescription);
