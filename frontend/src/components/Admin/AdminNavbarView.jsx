import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminNavbarView extends Component {
  render() {
    const { onLogout } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <div>
          <Link
            className="navbar-brand"
            data-toggle="tooltip"
            data-placement="bottom"
            title="User Dashboard"
            to="/"
          >
            <i className="fa fa-chevron-circle-left"></i>
          </Link>
          <Link className="navbar-brand" to="/admin">
            Admin Dashboard
          </Link>
        </div>
        <div>
          <Link
            className="btn btn-light my-2 my-sm-0 text-dark"
            to="/admin/create-election"
          >
            Create Election
          </Link>
          <Link className="btn btn-light my-2 my-sm-0 text-dark" to="/admin">
            Manage Elections
          </Link>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

export default AdminNavbarView;
