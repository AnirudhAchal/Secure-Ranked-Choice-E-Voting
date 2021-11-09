import React, { Component } from "react";
import ResultView from "./ResultView";
import ResultStaticView from "./ResultStaticView";

class ResultContainerView extends Component {
  constructor(props) {
    super(props);

    const { election } = this.props;

    this.state = {
      election: election,
      results: election.election_details["results"],
      static1: true,
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

    const { static1 } = this.state;
    const { winner, history } = results;

    if (!winner || !history) {
      return (
        <center>
          <h2>There were no votes casted in this election</h2>
        </center>
      );
    }
    let view;
    if (!static1) {
      view = (
        <ResultStaticView
          results={results}
          idToCandidateUsername={this.idToCandidateUsername}
        />
      );
    } else {
      view = (
        <ResultView
          results={results}
          idToCandidateUsername={this.idToCandidateUsername}
        />
      );
    }

    let butt;

    butt = (
      <button
        onClick={() => {
          this.setState({ static1: !this.state.static1 });
        }}
        className="btn btn-dark togbut"
        style={{ display: "none" }}
        id="togbut"
      >
        Toggle View
      </button>
    );

    function hideElement() {
      document.getElementById("togbut").style.display = "block";
    }
    setTimeout(hideElement, 10000);

    return (
      <>
        {view}
        <div className="text-center d-flex justify-content-center my-5">
          {butt}
        </div>
      </>
    );
  }
}

export default ResultContainerView;
