import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashboardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upcomingElection: {
        elections: [
          {
            electionName: "Student Elections",
            electionDesc: "CSE CR Elections",
          },
          {
            electionName: "Hostel Committee",
            electionDesc: "General Secretary Elections",
          },
        ],
      },
      currentElection: {
        elections: [
          {
            electionName: "Hostel 1 Mess Counsellor",
            electionDesc: "CSE CR Elections",
            votesYet: 120,
            votesTotal: 240,
          },
          {
            electionName: "Sports Co-ordinator",
            electionDesc: "General Secretary Elections",
            votesYet: 500,
            votesTotal: 740,
          },
        ],
      },
      pastElection: {
        elections: [
          {
            electionName: "Communist House",
            electionDesc: "House Committee President Elections",
            votesCast: 400,
            votesTotal: 840,
          },
        ],
      },
    };
  }

  renderUpcoming() {
    return this.state.upcomingElection.elections.map((elections) => {
      return (
        <>
          <div className="col-lg-4">
            <div className="mx-3 card">
              <div className="card-body">
                <h5 className="card-title">{elections.electionName}</h5>
                <p className="card-text">{elections.electionDesc}</p>
                <button type="button" className="btn btn-primary">
                  Stand as a Candidate
                </button>
              </div>
            </div>
          </div>
        </>
      );
    });
  }

  renderOngoing() {
    return this.state.currentElection.elections.map((elections) => {
      return (
        <>
          <div className="col-lg-4">
            <div className="mx-3 card">
              <div className="card-body">
                <h5 className="card-title">{elections.electionName}</h5>
                <p className="card-text">
                  Votes Recieved yet: {elections.votesYet}/
                  {elections.votesTotal}
                </p>
                <Link to="/ballot" className="btn btn-primary">
                  Vote
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    });
  }

  renderPast() {
    return this.state.pastElection.elections.map((elections) => {
      return (
        <>
          <div className="col-lg-4">
            <div className="mx-3 card">
              <div className="card-body">
                <h5 className="card-title">{elections.electionName}</h5>
                <p className="card-text">{elections.electionDesc}</p>
                <p className="card-text">
                  Total Votes Recieved: {elections.votesCast}/
                  {elections.votesTotal}
                </p>
                <button type="button" className="btn btn-primary">
                  Result
                </button>
              </div>
            </div>
          </div>
        </>
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
          <div className="row">{this.renderOngoing()}</div>
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
          <div className="row">{this.renderPast()}</div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
