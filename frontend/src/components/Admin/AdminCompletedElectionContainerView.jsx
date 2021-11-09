import React, { Component } from "react";
import axiosInstance from "../../axios";
import AdminCompletedElectionView from "./AdminCompletedElectionView";

export class AdminCompletedElectionContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedElections: [],
    };
  }

  async componentDidMount() {
    axiosInstance
      .get("/election/admin-completed/")
      .then((res) => {
        this.setState({ completedElections: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { completedElections } = this.state;

    return (
      <AdminCompletedElectionView completedElections={completedElections} />
    );
  }
}

export default AdminCompletedElectionContainerView;
