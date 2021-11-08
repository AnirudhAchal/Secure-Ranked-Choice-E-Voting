import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavbarView extends Component {
  render() {
    const { onLogout } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Dashboard
        </Link>
        <Link className="btn btn-light my-2 my-sm-0" to="/create-election">
          Create Election
        </Link>
        <Link className="btn btn-light my-2 my-sm-0" to="/admin">
          Manage Elections
        </Link>
        <Link className="btn btn-light my-2 my-sm-0" to="/myprofile">
          Profile
        </Link>
        <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
          Logout
        </button>
      </nav>
    );
  }
}

export default NavbarView;
