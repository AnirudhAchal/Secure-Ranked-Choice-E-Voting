import React, { Component } from "react";
import DashboardView from "./DashboardView";
import axiosInstance from "../axios";
import { Redirect } from "react-router";
import isAuthenticated from "./utils/authentication";

class DashboardContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      upcomingElections: [],
      currentElections: [],
      completedElections: [],
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    if (!isAuthenticated()) {
      this.setState({
        redirectToLogin: true,
      });
    }

    axiosInstance
      .get("/election/upcoming/")
      .then((res) => {
        this.setState({ upcomingElections: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .get("/election/completed/")
      .then((res) => {
        this.setState({ completedElections: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .get("/election/current/")
      .then((res) => {
        this.setState({ currentElections: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLogout() {
    axiosInstance
      .post("authentication/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;

    this.setState({
      redirectToLogin: true,
    });
  }

  render() {
    const {
      redirectToLogin,
      currentElections,
      upcomingElections,
      completedElections,
    } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <DashboardView
        onLogout={this.handleLogout}
        currentElections={currentElections}
        upcomingElections={upcomingElections}
        completedElections={completedElections}
      />
    );
  }
}

export default DashboardContainerView;
