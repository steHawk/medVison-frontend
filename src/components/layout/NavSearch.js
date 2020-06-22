import React, { Component } from "react";
import { Link } from "react-router-dom";
export class NavSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchkey: '',
      items: [],
    }
  }

  setSearchKey(event) {
    try {
      const signal = AbortController.signal;
      this.setState({
        searchkey: event.target.value
      })
      if (event.target.value === '') {
        this.setState({
          items: []
        })
      } else {
        let requrl = 'https://api.emetroplus.com/drug/search';
        let data = { 'keyword': event.target.value };
        fetch(requrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }, { signal: signal })
          .then(response =>
            response.json()
          )
          .then(data => {
            //console.log(data);
            if (data.ok && data) {
              this.setState({
                items: data.data
              })
            } else {
              this.setState({
                items: []
              })
            }
            //console.log(data.data);
          })
      }
      return function cleanup() {
        AbortController.abort();
      }

    }
    catch (e) {
      console.log(JSON.stringify(e));
    }

  }

  clearSearch(e) {
    this.setState({
      searchkey: "",
      items: [],
    })
  }

  render() {
    return (
      <div>
        <div className="search">
          <input type="text" value={this.state.searchkey} onChange={(event, _) => this.setSearchKey(event)} placeholder="Search for test,medicine,doctor." />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <div>
          {this.state.items.length > 0
            ?
            <table>
              <tbody>
                {this.state.items.map(item => <tr key={item._id} >
                  <td> <Link to={`/drug/${item._id}`} onClick={(e) => this.clearSearch(e)} id={item._id} type="button" key={item._id}>{item.doctorPrescriptionName}</Link></td>
                  <td>{item.netAmount}</td></tr>)}
              </tbody>
            </table>
            : null}
        </div>
      </div>

    );
  }
}

export default NavSearch;

