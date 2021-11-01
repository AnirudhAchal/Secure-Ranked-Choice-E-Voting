import React, { Component } from "react";

class ResultView extends Component {
  render() {
    const { results, idToCandidateUsername } = this.props;
    const { winner, history } = results;

    // Delete after completing this component
    console.log(winner);
    console.log(history);
    console.log(idToCandidateUsername);

    // Add results in this component

    return <div></div>;
  }
}

export default ResultView;
