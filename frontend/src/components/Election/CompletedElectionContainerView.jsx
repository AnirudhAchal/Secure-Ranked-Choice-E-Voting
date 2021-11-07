import React, { Component } from "react";
import axiosInstance from "../../axios";
import CompletedElectionView from "./CompletedElectionView";

export class CompletedElectionContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedElections: [],
    };
  }

  async componentDidMount() {
    axiosInstance
      .get("/election/completed/")
      .then((res) => {
        this.setState({ completedElections: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { completedElections } = this.state;
    return <CompletedElectionView completedElections={completedElections} />;
  }
}

export default CompletedElectionContainerView;
