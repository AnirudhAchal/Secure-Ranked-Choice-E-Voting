import React, { Component } from "react";

class ResultView extends Component {
  render() {
    const { results } = this.props;
    const { winner, history } = results;

    console.log(winner);
    console.log(history);

    return <div></div>;
  }
}

export default ResultView;
