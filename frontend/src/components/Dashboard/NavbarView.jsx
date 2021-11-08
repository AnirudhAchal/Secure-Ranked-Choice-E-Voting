import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavbarView extends Component {
  render() {
    const { onLogout } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Dashboard
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/myprofile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createElection">Create Election</Link>
            </li>
          </ul>
        </div>
        <button className="btn btn-light navbar-right my-2 my-sm-0" onClick={onLogout}>
          Logout
        </button>
      </nav>
    );
  }
}

export default NavbarView;
