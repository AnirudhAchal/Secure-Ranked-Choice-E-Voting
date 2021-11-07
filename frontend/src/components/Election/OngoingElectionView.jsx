import React, { Component } from "react";
import { Link } from "react-router-dom";

export class OngoingElectionView extends Component {
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
  
  renderCurrent() {
    const { currentElections } = this.props;

    return currentElections.map((election) => {
      return (
        <div className="col-lg-4" key={election.id}>
          <div className="mx-3 my-3 card">
            <div className="card-body">
              <h5 className="card-title">{election.name}</h5>
              <p className="card-text">
                Registered Voters: {election.voters.length}
              </p>
              <Link
                to={`/election/${election.id}/`}
                className="btn btn-dark"
              >
                Vote
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
            Ongoing Elections
          </h3>
          <hr />
          <div className="row">{this.renderCurrent()}</div>
        </div>
      </>
    );
  }
}

export default OngoingElectionView;
