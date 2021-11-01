import React, { Component } from "react";
import { Link } from "react-router-dom";

export class CompletedElectionView extends Component {
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
              <p className="card-text">
                Winner: {election.winner && election.winner.user_name}
              </p>
              <Link
                to={`/election/${election.id}/`}
                className="btn btn-primary"
              >
                Full Results
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
            Completed Elections
          </h3>
          <hr />
          <div className="row">{this.renderCompleted()}</div>
        </div>
      </>
    );
  }
}

export default CompletedElectionView;
