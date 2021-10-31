import React, { Component } from "react";
import ResultView from "./resultView";

class ResultContainerView extends React.Component {
  constructor(props) {
    super(props);

    const { election } = this.props;

    this.state = {
      election: election,
      results: election.election_details["results"],
    };
  }

  render() {
    const { results } = this.state;
    return <ResultView results={results} />;
  }
}

export default ResultContainerView;
