import React, { Component } from "react";
import Ballot from "./Ballot";

class ElectionView extends Component {
  renderBody() {
    const { election } = this.props;

    return (
      <div>
        <h1>Election Name : {election.name}</h1>
        <h2>Election Date Posted : {election.date_posted}</h2>
        <h2>Election Start Date : {election.start_date}</h2>
        <h2>Election End Date : {election.end_date}</h2>
        <Ballot election={election} />
      </div>
    );
  }

  render() {
    const { electionHasLoaded } = this.props;

    return <div>{electionHasLoaded && this.renderBody()}</div>;
  }
}

export default ElectionView;
