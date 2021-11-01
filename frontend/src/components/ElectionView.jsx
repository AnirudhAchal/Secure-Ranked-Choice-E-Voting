import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import BallotContainerView from "./BallotContainerView";
import ResultContainerView from "./ResultContainerView";

class ElectionView extends Component {
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

  renderBallot() {
    const { election } = this.props;

    return <BallotContainerView election={election} />;
  }

  renderResults() {
    const { election } = this.props;

    return <ResultContainerView election={election} />;
  }

  renderBody() {
    const { election } = this.props;

    if (election.election_details && election.election_details["results"]) {
      return this.renderResults();
    } else {
      return this.renderBallot();
    }
  }

  renderFooter() {
    const { election } = this.props;
    var mailtos = [];
    for (var i = 0; i < election.admins.length; i++) {
      var mailt= "mailto:"+ election.admins[i].email
      mailtos.push(
        <>
          {election.admins[i].user_name}: <a href={mailt}>{election.admins[i].email}</a>
          <br/>
          </>
        );
    }
    console.log(mailtos)
    return (
      <p className="text-right font-weight-light align-bottom" style={{paddingRight: '15px'}}>
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
        {this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default ElectionView;
