import React, { Component } from "react";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import Moment from "moment";
import NavbarContainerView from "../Dashboard/NavbarContainerView";
import { Link } from "react-router-dom";

export class AdminUpcomingElectionView extends Component {
  renderNavbar() {
    return <NavbarContainerView />;
  }

  renderUpcoming() {
    const { upcomingElections } = this.props;
    return upcomingElections.map((election) => {
      return (
        <div className="col-lg-4" key={election.id}>
          <div className="mx-3 my-3 card">
            <div className="card-body">
              <h5 className="card-title">{election.name}</h5>
              <p className="card-text">
                {election.election_details &&
                  election.election_details.description}
              </p>
              <p className="card-text">
                <b>Start date:</b>{" "}
                {Moment(election.start_date).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <p className="card-text">
                <b>End date:</b>{" "}
                {Moment(election.end_date).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <Link
                to={`/admin-election/${election.id}/`}
                className="btn btn-dark"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <div>{this.renderNavbar()}</div>
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">
            Upcoming Elections
          </h3>
          <hr />
          <div className="row">{this.renderUpcoming()}</div>
        </div>
        <NotificationContainer />
      </>
    );
  }
}

export default AdminUpcomingElectionView;
