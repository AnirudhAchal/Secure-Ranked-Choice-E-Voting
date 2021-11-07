import React, { Component } from "react";
import { Link } from "react-router-dom";
import ongoing from "../../images/ongoing.jpg";
import upcoming from "../../images/upcoming.jpg";
import completed from "../../images/completed.png";
import NavbarContainerView from "./NavbarContainerView";

class DashboardView extends Component {
  render() {
    return (
      <div>
        <NavbarContainerView />
        <div
          className="d-flex justify-content-center text-center mt-10"
          style={{ paddingTop: "10%" }}
        >
          <div className="card-deck">
            <div className="mx-5 my-3 card" style={{ width: "400px" }}>
              <img
                src={upcoming}
                alt="Upcoming"
                style={{ width: "300px" }}
                className="rounded mx-auto d-block card-img-top"
              />
              <div className="card-body ">
                <Link to="/upcoming" className="stretched-link text-dark">
                  <h5 className="card-text ">Upcoming Elections</h5>
                </Link>
              </div>
            </div>

            <div className="mx-5 my-3 card" style={{ width: "400px" }}>
              <img
                src={ongoing}
                alt="Ongoing"
                style={{ width: "300px" }}
                className="rounded mx-auto d-block card-img-top"
              />
              <div className="card-body">
                <Link to="/ongoing" className="stretched-link text-dark">
                  <h5 className="card-text">Ongoing Elections</h5>
                </Link>
              </div>
            </div>

            <div className="mx-5 my-3 card" style={{ width: "400px" }}>
              <img
                src={completed}
                alt="Completed"
                style={{ width: "300px" }}
                className="rounded mx-auto d-block"
              />
              <div className="card-body">
                <Link to="/completed" className="stretched-link text-dark">
                  <h5 className="card-text">Completed Elections</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
