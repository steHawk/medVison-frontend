import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import baseURL from "../../api/baseURL";
export class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchkey: "",
      searchMeds: [],
    };
  }

  setSearchKey(event) {
    try {
      const signal = AbortController.signal;
      this.setState({
        searchkey: event.target.value,
      });
      if (event.target.value === "") {
        this.setState({
          searchMeds: [],
        });
      } else {
        let requrl =`${baseURL}drug/search`;
        let data = { keyword: event.target.value };
        fetch(
          requrl,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
          { signal: signal }
        )
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            if (data.ok && data) {
              this.setState({
                searchMeds: data.data,
              });
            } else {
              this.setState({
                searchMeds: [],
              });
            }
            //console.log(data.data);
          });
      }
      return function cleanup() {
        AbortController.abort();
      };
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  clearSearch(e) {
    this.setState({
      searchkey: "",
      searchMeds: [],
    });
  }

  render() {
    console.log("")
    return (
      <div>
        <div className="search">
          <input
            type="text"
            value={this.state.searchkey}
            onChange={(event, _) => this.setSearchKey(event)}
            placeholder="Search for test,medicine,doctor."
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <div>
          {this.state.searchMeds.length > 0 ? (
            <table className="drugList">
              <tbody>
                {this.state.searchMeds.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {" "}
                      <NavLink
                        to={`/drug/${item._id}`}
                        onClick={(e) => this.clearSearch(e)}
                        id={item._id}
                        type="button"
                        key={item._id}
                      >
                        {item.doctorPrescriptionName}
                      </NavLink>
                    </td>
                    <td>{item.netAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    );
  }
}

export default NavSearch;


// import React, { Component } from "react";
// import { itemSearch } from "../../actions/itemsActions";
// import { connect } from "react-redux";
// import { Link, NavLink } from "react-router-dom";


// class NavSearch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchkey: "",
//       searchMeds: [],
//     };
//   }

//   onChange = (e) => {
//     this.setState({
//       searchkey: e.target.value,
//     });
//     if (e.target.value === "") {
//       this.setState({
//         searchMeds: [],
//       });
     
//     } else {
//       this.props.itemSearch(this.state.searchkey);
//       this.setState({
//         searchMeds:  this.props.searchItems,
//       });
//     }
//     console.log(this.props.searchItems)
//   };

//   render() {
//     return (
//       <div>
//         <div className="search">
//           <input
//             type="text"
//             value={this.state.searchkey}
//             onChange={this.onChange}
//             placeholder="Search for test,medicine,doctor."
//           />
//           <i className="fa fa-search" aria-hidden="true"></i>
//         </div>
//         <div>
//           {this.state.searchMeds.length > 0 ? (
//             <table className="drugList">
//               <tbody>
//                 {this.state.searchMeds.map((item) => (
//                   <tr key={item._id}>
//                     <td>
//                       {" "}
//                       <NavLink
//                         to={`/drug/${item._id}`}
                    
//                         id={item._id}
//                         type="button"
//                         key={item._id}
//                       >
//                         {item.doctorPrescriptionName}
//                       </NavLink>
//                     </td>
//                     <td>{item.netAmount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : null}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   searchItems: state.searchItems.searchItems,
// });

// export default connect(mapStateToProps, { itemSearch })(NavSearch);
