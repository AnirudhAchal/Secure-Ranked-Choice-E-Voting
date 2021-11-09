import React, { Component } from "react";
import axiosInstance from "../../axios";
import BallotView from "./BallotView";
import NotificationManager from "react-notifications/lib/NotificationManager";
import getErrorMessage from "../utils/response";

class BallotContainerView extends Component {
  constructor(props) {
    super(props);

    const { election } = this.props;

    this.state = {
      election: election,
      totalPreferences: election.candidates.length,
      tracker: new Array(election.candidates.length).fill(null),
      disableSubmit: false,
    };

    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateBallot = this.validateBallot.bind(this);
  }

  handleChangeValue(e) {
    const idx = Number(e.target.name) - 1;
    const pref = Number(e.target.value);

    const { tracker } = this.state;

    tracker[idx] = pref;

    this.setState({
      tracker: tracker,
    });
  }

  validateBallot() {
    const { totalPreferences, tracker, disableSubmit } = this.state;

    var val = new Array(tracker.length).fill(null);
    for (let i = 0; i < val.length; i++) {
      if (tracker[i] !== null) val[tracker[i] - 1] += 1;
    }

    for (let i = 0; i < totalPreferences; i++) {
      if (val[i] !== 1) {
        return false;
      }
    }

    return true && !disableSubmit;
  }

  handleSubmit() {
    const { tracker, election } = this.state;

    var preferences = new Array(tracker.length).fill(null);

    for (let i = 0; i < preferences.length; i++) {
      preferences[i] = election.candidates[tracker[i] - 1].id;
    }

    this.setState({
      disableSubmit: true,
    });

    axiosInstance
      .post("/election/vote/", {
        election: election.id,
        vote_details: {
          preferences: preferences,
        },
      })
      .then((res) => {
        NotificationManager.success(
          "Your vote has been submitted!",
          "Submission Successful",
          5000
        );
        this.setState({
          disableSubmit: false,
        });
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          getErrorMessage(err),
          "Submission Failed",
          5000
        );
        this.setState({
          disableSubmit: false,
        });
      });
  }

  render() {
    const { election, tracker, totalPreferences } = this.state;
    return (
      <BallotView
        election={election}
        tracker={tracker}
        totalPreferences={totalPreferences}
        onSubmit={this.handleSubmit}
        onChangeValue={this.handleChangeValue}
        validateBallot={this.validateBallot}
      />
    );
  }
}

export default BallotContainerView;
