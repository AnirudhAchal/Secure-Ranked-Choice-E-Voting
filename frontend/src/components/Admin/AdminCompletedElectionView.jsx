import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminNavbarContainerView from "./AdminNavbarContainerView";

export class CompletedElectionView extends Component {
  renderNavbar() {
    return <AdminNavbarContainerView />;
  }

  renderWinner(election) {
    if (election.winner) {
      return <p className="card-text">Winner: {election.winner.user_name}</p>;
    }

    return null;
  }

  renderCompleted() {
    const { completedElections } = this.props;

    return completedElections.map((election) => {
      return (
        <div className="col-lg-4" key={election.id}>
          <div className="mx-3 my-3 card">
            <div className="card-body">
              <h5 className="card-title">{election.name}</h5>
              <p className="card-text">
                {election.election_details &&
                  election.election_details.description}
              </p>
              {this.renderWinner(election)}
              <Link
                to={`/admin/election/${election.id}/`}
                className="btn btn-dark"
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
    const { completedElections } = this.props;
    
    return (
      <>
        <div>{this.renderNavbar()}</div>
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">
            Completed Elections
          </h3>
          <hr />
          {completedElections.length === 0 &&
            <center><h4><i><b> No Completed Elections </b></i></h4></center>
          } 
          <div className="row">{this.renderCompleted()}</div>
        </div>
      </>
    );
  }
}

export default CompletedElectionView;
