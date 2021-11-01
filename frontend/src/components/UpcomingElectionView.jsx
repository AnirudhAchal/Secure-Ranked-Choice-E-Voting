import React, { Component } from "react";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { Link } from "react-router-dom";

export class UpcomingElectionView extends Component {
  renderNavbar() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Dashboard
          </Link>
        </nav>
      </div>
    );
  }

  renderButton(election) {
    const { onSubmitRequest, standingAsCandidate } = this.props;

    if (standingAsCandidate[election.id]) {
      return <p>Registered as candidate!</p>;
    }

    return (
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => onSubmitRequest(election)}
      >
        Stand as a Candidate
      </button>
    );
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
              {this.renderButton(election)}
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

export default UpcomingElectionView;
