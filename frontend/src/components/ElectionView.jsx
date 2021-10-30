import React, { Component } from "react";
import Ballot from "./Ballot";
import { Link } from "react-router-dom";
import Moment from "moment";

class ElectionView extends Component {
  renderBody() {
    const { election } = this.props;

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Dashboard
          </Link>
        </nav>
        <div className="display-3 pb-3 mb-3 border-bottom d-flex justify-content-center my-1">
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
        <hr />

        <Ballot election={election} />
        <p className="text-right font-weight-light align-bottom">
          Posted {Moment(election.date_posted).startOf("hour").fromNow()}
        </p>
      </div>
    );
  }

  render() {
    const { electionHasLoaded } = this.props;

    return <div>{electionHasLoaded && this.renderBody()}</div>;
  }
}

export default ElectionView;
