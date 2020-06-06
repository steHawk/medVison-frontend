import React, { Component } from "react";

class NavSearch extends Component {
  render() {
    return (
      <div className="search">
        <input type="text" placeholder="Search for test,medicine,doctor." />


        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9IiMxMzRGNzAiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTExIDE4YTcgNyAwIDEgMSAwLTE0IDcgNyAwIDAgMSAwIDE0em0wLTEuNWE1LjUgNS41IDAgMSAwIDAtMTEgNS41IDUuNSAwIDAgMCAwIDExeiIvPgogICAgICAgIDxwYXRoIGQ9Ik0xNSAxNi4wNkwxNi4wNiAxNWwzLjcxMyAzLjcxMmEuNzUuNzUgMCAwIDEtMS4wNiAxLjA2TDE1IDE2LjA2MnoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" alt="search" />


      </div>
    );
  }
}

export default NavSearch;
