import React, { Component } from "react";
import ResultView from "./ResultView";

class ResultContainerView extends Component {
  constructor(props) {
    super(props);

    const { election } = this.props;

    this.state = {
      election: election,
      results: election.election_details["results"],
    };

    this.idToCandidateUsername = this.getCandidateUsernames();
  }

  getCandidateUsernames() {
    const { election } = this.state;
    const { candidates } = election;
    const idToCandidateUsername = {};

    for (let i = 0; i < candidates.length; i++) {
      idToCandidateUsername[candidates[i].id] = candidates[i].user_name;
    }

    return idToCandidateUsername;
  }

  render() {
    const { results } = this.state;

    return (
      <ResultView
        results={results}
        idToCandidateUsername={this.idToCandidateUsername}
      />
    );
  }
}

export default ResultContainerView;
