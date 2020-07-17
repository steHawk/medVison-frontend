import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { search, clearItemsList } from "../../actions/medSearch";
import { connect } from "react-redux";
import PropTypes from 'prop-types'



export class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
    };
  }

  static propTypes = {
    search: PropTypes.func.isRequired,
    ClearItemsList: PropTypes.func,
    isDataLoading: PropTypes.bool,
    data: PropTypes.array,
  };

  onChange(event) {
    if (event.target.value.length > 0) {
      this.setState({
        [event.target.name]: event.target.value,
        msg: "Loading...!!!",
      });
      this.props.search(event.target.value);
    } else {
      this.setState({ [event.target.name]: event.target.value, msg: "" });
    }
  }

  ClearItemsList() {
    this.props.clearItemsList();
  }

  render() {
    return (
     
        <div className="search">
        
          <input
            type="text"
            value={this.state.item}
            name="item"
            onChange={(event) => this.onChange(event)}
            placeholder="Search for test,medicine,doctor."
          />
         

          <table className="drugList">
            <tbody>
              {this.props.data.map((items, i) => (
                <tr key={i}>
                  <td>
                    <Link
                      to={{
                        pathname: "/to/item",
                        state: { items: items },
                      }}
                      onClick={() => this.ClearItemsList()}
                    >
                      {" "}
                      {items.doctorPrescriptionName}
                    </Link>
                  </td>
                  <td>{items.mrp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
   
    
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  isDataLoading: state.data.isDataLoading,
});

export default connect(mapStateToProps, { search, clearItemsList })(NavSearch);
