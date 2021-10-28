import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashboardView extends Component {
  renderUpcoming() {
    const { upcomingElections } = this.props;
    return upcomingElections.map((election) => {
      return (
        <div className="col-lg-4" key={election.id}>
          <div className="mx-3 card">
            <div className="card-body">
              <h5 className="card-title">{election.name}</h5>
              <p className="card-text">
                {election.election_details &&
                  election.election_details.description}
              </p>
              <button type="button" className="btn btn-primary">
                Stand as a Candidate
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  renderCurrent() {
    const { currentElections } = this.props;

    return currentElections.map((election) => {
      return (
        <div className="col-lg-4" key={election.id}>
          <div className="mx-3 card">
            <div className="card-body">
              <h5 className="card-title">{election.name}</h5>
              <p className="card-text">
                Registered Voters: {election.voters.length}
              </p>
              <Link to="/ballot" className="btn btn-primary">
                Vote
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  renderCompleted() {
    const { completedElections } = this.props;

    return completedElections.map((election) => {
      return (
        <div className="col-lg-4" key={election.id}>
          <div className="mx-3 card">
            <div className="card-body">
              <h5 className="card-title">{election.name}</h5>
              <p className="card-text">
                {election.election_details &&
                  election.election_details.description}
              </p>
              <p className="card-text">Winner: {election.winner}</p>
              <button type="button" className="btn btn-primary">
                Full Results
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

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
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">
            Ongoing Elections
          </h3>
          <hr />
          <div className="row">{this.renderCurrent()}</div>
        </div>
        <hr />
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">
            Upcoming Elections
          </h3>
          <hr />
          <div className="row">{this.renderUpcoming()}</div>
        </div>
        <hr />
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">
            Completed Elections
          </h3>
          <hr />
          <div className="row">{this.renderCompleted()}</div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
