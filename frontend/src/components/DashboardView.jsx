import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashboardView extends Component {
  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Dashboard
          </Link>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </nav>
      </div>
    );
  }
}

export default DashboardView;
