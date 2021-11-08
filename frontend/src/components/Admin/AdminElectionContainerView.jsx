import React, { Component } from "react";
import axiosInstance from "../../axios";
import AdminElectionView from "./AdminElectionView";

class AdminElectionContainerView extends Component {
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
      .get(`/election/admin-${electionId}/`)
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
      <AdminElectionView
        electionHasLoaded={electionHasLoaded}
        election={election}
      />
    );
  }
}

export default AdminElectionContainerView;
