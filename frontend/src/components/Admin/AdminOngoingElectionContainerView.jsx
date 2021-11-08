import React, { Component } from "react";
import axiosInstance from "../../axios";
import AdminOngoingElectionView from "./AdminOngoingElectionView";

class AdminOngoingElectionContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentElections: [],
    };
  }

  async componentDidMount() {
    axiosInstance
      .get("/election/admin-current/")
      .then((res) => {
        this.setState({ currentElections: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { currentElections } = this.state;
    return <AdminOngoingElectionView currentElections={currentElections} />;
  }
}

export default AdminOngoingElectionContainerView;
