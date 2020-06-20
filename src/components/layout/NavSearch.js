import React, { Component } from "react";
export class NavSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchkey: '',
      items: [],
    }
  }

  setItemName(e) {
    this.setState({
      searchkey: e.target.value
    })
    //this.setSearchKey(e.target.value)
    //this.searchItem(e.target.value);
    //console.log(e.target.value);
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



  render() {
    return (
      <div className="search">
        <input type="text" value={this.state.searchkey} onChange={(event, _) => this.setSearchKey(event)} placeholder="Search for test,medicine,doctor." />
        <i className="fa fa-search" aria-hidden="true"></i>
        {this.state.items.length > 0
          ?
          <table>
            <tbody>
              {this.state.items.map(item => <tr key={item._id} >
                <td> <input id="itemsbtn" type="button" key={item._id} value={item.doctorPrescriptionName} onClick={(e) => this.setItemName(e)} /></td>
                <td>{item.netAmount}</td></tr>)}
          </tbody>
          </table>
          : null}
      </div>

    );
  }
}

export default NavSearch;

