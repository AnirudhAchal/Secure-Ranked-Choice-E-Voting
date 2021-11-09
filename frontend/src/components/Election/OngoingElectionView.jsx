import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarContainerView from "../Dashboard/NavbarContainerView";

export class OngoingElectionView extends Component {
  renderNavbar() {
    return <NavbarContainerView />;
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
              <Link to={`/election/${election.id}/`} className="btn btn-dark">
                Vote
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { currentElections } = this.props;

    return (
      <>
        <div>{this.renderNavbar()}</div>
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">
            Ongoing Elections
          </h3>
          <hr />
          {currentElections.length === 0 &&
            <center><h4><i><b> No Ongoing Elections </b></i></h4></center>
          }
          <div className="row">{this.renderCurrent()}</div>
        </div>
      </>
    );
  }
}

export default OngoingElectionView;
