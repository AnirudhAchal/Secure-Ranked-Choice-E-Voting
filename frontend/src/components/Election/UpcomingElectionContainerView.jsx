import React, { Component } from "react";
import axiosInstance from "../../axios";
import getCurrentUserId from "../utils/user";
import UpcomingElectionView from "./UpcomingElectionView";
import NotificationManager from "react-notifications/lib/NotificationManager";

export class UpcomingElectionContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upcomingElections: [],
      standingAsCandidate: {},
    };

    this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
  }

  async componentDidMount() {
    axiosInstance
      .get("/election/upcoming/")
      .then((res) => {
        const currentUserId = getCurrentUserId();
        const { standingAsCandidate } = this.state;
        const upcomingElections = res.data;

        for (let i = 0; i < upcomingElections.length; i++) {
          const election = upcomingElections[i];
          standingAsCandidate[Number(election.id)] = false;

          for (let j = 0; j < election.candidates.length; j++) {
            const candidate = election.candidates[j];
            if (candidate.id === currentUserId) {
              standingAsCandidate[Number(election.id)] = true;
              break;
            }
          }
        }

        this.setState({
          upcomingElections: upcomingElections,
          standingAsCandidate: standingAsCandidate,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmitRequest(election) {
    axiosInstance
      .post("/election/create-candidate/", {
        candidate: getCurrentUserId(),
        election: election.id,
      })
      .then((res) => {
        NotificationManager.success(
          "You are now a candidate!",
          "Request Approved",
          5000
        );

        const { standingAsCandidate } = this.state;
        standingAsCandidate[election.id] = true;
        this.setState({ standingAsCandidate: standingAsCandidate });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { upcomingElections, standingAsCandidate } = this.state;

    return (
      <UpcomingElectionView
        upcomingElections={upcomingElections}
        onSubmitRequest={this.handleSubmitRequest}
        standingAsCandidate={standingAsCandidate}
      />
    );
  }
}

export default UpcomingElectionContainerView;
