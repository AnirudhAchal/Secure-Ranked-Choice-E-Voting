import React, { Component } from "react";
import axiosInstance from "../../axios";
import ElectionView from "./ElectionView";

class ElectionContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      electionId: this.props.match.params.id,
      electionHasLoaded: false,
      election: {},
    };
  }

  componentDidMount() {
    const { electionId } = this.state;

    axiosInstance
      .get(`/election/${electionId}/`)
      .then((res) => {
        this.setState({ election: res.data, electionHasLoaded: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { election, electionHasLoaded } = this.state;

    return (
      <ElectionView electionHasLoaded={electionHasLoaded} election={election} />
    );
  }
}

export default ElectionContainerView;
