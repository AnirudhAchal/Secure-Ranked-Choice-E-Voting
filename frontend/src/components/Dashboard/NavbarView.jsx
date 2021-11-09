import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavbarView extends Component {
  render() {
    const { onLogout } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <div>
          <Link className="navbar-brand" to="/">
            Dashboard
          </Link>
        </div>
        <div>
          <Link className="btn btn-light my-2 my-sm-0 text-dark" to="/admin">
            Admin
          </Link>
          <Link
            className="btn btn-light my-2 my-sm-0 text-dark"
            to="/myprofile"
          >
            Profile
          </Link>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

export default NavbarView;
