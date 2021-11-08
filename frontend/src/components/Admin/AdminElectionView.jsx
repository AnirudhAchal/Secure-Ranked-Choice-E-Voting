import React, { Component } from "react";
import Moment from "moment";
import ResultContainerView from "../Election/ResultContainerView";
import AdminNavbarContainerView from "./AdminNavbarContainerView";

class AdminElectionView extends Component {
  renderNavbar() {
    return <AdminNavbarContainerView />;
  }

  renderHeader() {
    const { election } = this.props;

    return (
      <div>
        <div className="display-3 pb-3 mb-3  d-flex justify-content-center my-1">
          {election.name}
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-header lead">Start Date</div>
              <div className="card-body">
                <p className="lead">
                  {Moment(election.start_date).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-header lead">End Date</div>
              <div className="card-body">
                <p className="lead">
                  {Moment(election.end_date).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="container" />
      </div>
    );
  }

  renderDetailsTableData(items) {
    return items.map((item, index) => {
      const { user_name } = item;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user_name}</td>
        </tr>
      );
    });
  }

  renderVoterDetailsTableData(voters, voted_voters) {
    return voters.map((voter, index) => {
      const { user_name } = voter;
      let status = "Not voted";

      // Check if the voter has voted
      for (let i = 0; i < voted_voters.length; i++) {
        if (voted_voters[i].user_name === user_name) {
          status = "Voted";
          break;
        }
      }

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user_name}</td>
          <td>{status}</td>
        </tr>
      );
    });
  }

  renderAdminDetails() {
    const { election } = this.props;

    return (
      <div>
        <h1 className="text-center display-4 my-3">Election Admins</h1>
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{this.renderDetailsTableData(election.admins)}</tbody>
        </table>
      </div>
    );
  }

  renderCandidateDetails() {
    const { election } = this.props;

    if (election.candidates.length === 0) {
      return null;
    }

    return (
      <div>
        <h1 className="text-center display-4 my-3">Candidates</h1>
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{this.renderDetailsTableData(election.candidates)}</tbody>
        </table>
      </div>
    );
  }

  renderVoterDetails() {
    const { election } = this.props;

    if (election.voters.length === 0) {
      return null;
    }

    return (
      <div>
        <h1 className="text-center display-4 my-3">Voters</h1>
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderVoterDetailsTableData(
              election.voters,
              election.voted_voters
            )}
          </tbody>
        </table>
      </div>
    );
  }

  renderDetails() {
    return (
      <div className="mt-4 container">
        {this.renderAdminDetails()}
        {this.renderCandidateDetails()}
        {this.renderVoterDetails()}
      </div>
    );
  }

  renderResults() {
    const { election } = this.props;

    if (election.election_details && election.election_details["results"]) {
      return <ResultContainerView election={election} />;
    }

    return null;
  }

  renderFooter() {
    const { election } = this.props;
    var mailtos = [];
    for (var i = 0; i < election.admins.length; i++) {
      var mailt = "mailto:" + election.admins[i].email;
      mailtos.push(
        <span key={i}>
          {election.admins[i].user_name}:{" "}
          <a href={mailt}>{election.admins[i].email}</a>
          <br />
        </span>
      );
    }

    return (
      <p
        className="text-right font-weight-light align-bottom"
        style={{ paddingRight: "15px" }}
      >
        Posted {Moment(election.date_posted).startOf("hour").fromNow()}
        <br />
        <br />
        For any technical problems, mail:
        <br /> {mailtos}
      </p>
    );
  }

  render() {
    const { electionHasLoaded } = this.props;

    if (!electionHasLoaded) {
      return null;
    }

    return (
      <div>
        {this.renderNavbar()}
        {this.renderHeader()}
        {this.renderDetails()}
        {this.renderResults()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default AdminElectionView;
