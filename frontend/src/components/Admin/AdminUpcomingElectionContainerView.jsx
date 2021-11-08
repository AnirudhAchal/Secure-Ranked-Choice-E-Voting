import React, { Component } from "react";
import axiosInstance from "../../axios";
import AdminUpcomingElectionView from "./AdminUpcomingElectionView";

export class AdminUpcomingElectionContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upcomingElections: [],
      standingAsCandidate: {},
    };
  }

  async componentDidMount() {
    axiosInstance
      .get("/election/admin-upcoming/")
      .then((res) => {
        this.setState({
          upcomingElections: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { upcomingElections } = this.state;

    return <AdminUpcomingElectionView upcomingElections={upcomingElections} />;
  }
}

export default AdminUpcomingElectionContainerView;
