import React, { Component } from "react";
import axiosInstance from "../../axios";
import CreateElectionView from "./CreateElectionView";
import NotificationManager from "react-notifications/lib/NotificationManager";

class CreateElectionContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      electionName: "",
      startDate: "",
      endDate: "",
      users: [],
      admins: [],
      voters: [],
    };

    this.handleChangeElectionName = this.handleChangeElectionName.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeAdmins = this.handleChangeAdmins.bind(this);
    this.handleChangeVoters = this.handleChangeVoters.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    axiosInstance
      .get("/authentication/user-list/")
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeElectionName(electionName) {
    this.setState({
      electionName: electionName,
    });
  }

  handleChangeStartDate(startDate) {
    this.setState({
      startDate: startDate,
    });
  }

  handleChangeEndDate(endDate) {
    this.setState({
      endDate: endDate,
    });
  }

  handleChangeAdmins(options) {
    const { users } = this.state;
    const admins = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        admins.push(users.find((user) => user.user_name === options[i].value));
      }
    }

    this.setState({ admins: admins });
  }

  handleChangeVoters(options) {
    const { users } = this.state;
    const voters = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        voters.push(users.find((user) => user.user_name === options[i].value));
      }
    }

    this.setState({ voters: voters });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { electionName, startDate, endDate, admins, voters } = this.state;

    axiosInstance
      .post("/election/create/", {
        name: electionName,
        start_date: startDate,
        end_date: endDate,
        admins: admins,
        voters: voters,
      })
      .then((res) => {
        console.log(res);
        NotificationManager.success("Election Created", "Successful", 5000);
      })
      .catch((err) => {
        let message = "";

        for (const error in err.response.data) {
          message += ` ${err.response.data[error]}.`;
        }

        NotificationManager.error(message, "Error", 5000);
      });
  }

  render() {
    const { users, electionName, startDate, endDate } = this.state;

    return (
      <CreateElectionView
        users={users}
        electionName={electionName}
        startDate={startDate}
        endDate={endDate}
        onSubmit={this.handleSubmit}
        onChangeElectionName={this.handleChangeElectionName}
        onChangeStartDate={this.handleChangeStartDate}
        onChangeEndDate={this.handleChangeEndDate}
        onChangeAdmins={this.handleChangeAdmins}
        onChangeVoters={this.handleChangeVoters}
      />
    );
  }
}

export default CreateElectionContainerView;
