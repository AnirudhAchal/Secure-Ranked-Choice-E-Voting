import React, { Component } from "react";
import axiosInstance from "../../axios";
import OngoingElectionView from "./OngoingElectionView";

class OngoingElectionContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentElections: [],
    };
  }

  async componentDidMount() {
    axiosInstance
      .get("/election/current/")
      .then((res) => {
        this.setState({ currentElections: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { currentElections } = this.state;
    return <OngoingElectionView currentElections={currentElections} />;
  }
}

export default OngoingElectionContainerView;
