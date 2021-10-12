import React, { Component } from "react";

class DashboardView extends Component {
  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Dashboard</a>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </nav>
      </div>
    );
  }
}

export default DashboardView;
