import React, { Component } from "react";
import { Link } from "react-router-dom";
import ongoing from "../images/ongoing.jpg";
import upcoming from "../images/upcoming.jpg";
import completed from "../images/completed.png";

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
        <div
          className="d-flex justify-content-center text-center mt-10"
          style={{ paddingTop: "10%" }}
        >
          <div className="card-deck">
            <Link to="/upcoming">
              <div className="mx-3 card" style={{ width: "350px" }}>
                <img
                  src={upcoming}
                  alt="Upcoming"
                  style={{ width: "300px" }}
                  className="rounded mx-auto d-block"
                />
                <div className="card-body">
                  <h5 className="card-text">Upcoming Elections</h5>
                </div>
              </div>
            </Link>
            <Link to="/ongoing">
              <div className="mx-3 card" style={{ width: "350px" }}>
                <img
                  src={ongoing}
                  alt="Ongoing"
                  style={{ width: "300px" }}
                  className="rounded mx-auto d-block"
                />
                <div className="card-body">
                  <h5 className="card-text">Ongoing Elections</h5>
                </div>
              </div>
            </Link>
            <Link to="/completed">
              <div className="mx-3 card" style={{ width: "350px" }}>
                <img
                  src={completed}
                  alt="Completed"
                  style={{ width: "300px" }}
                  className="rounded mx-auto d-block"
                />
                <div className="card-body">
                  <h5 className="card-text">Completed Elections</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
