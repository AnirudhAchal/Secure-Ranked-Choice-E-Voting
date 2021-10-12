import React, { Component } from "react";
import DashboardView from "./DashboardView";
import axiosInstance from "../axios";
import { Redirect } from "react-router";

class DashboardContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    // Temporary check
    // Will be automatically redirected to login page
    // if the user is not autheticated while doing get election api call
    if (localStorage.getItem("refresh_token") === null) {
      this.setState({
        redirectToLogin: true,
      });
    }
  }

  handleLogout() {
    const response = axiosInstance.post("authentication/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    console.log(response);
    this.setState({
      redirectToLogin: true,
    });
  }

  render() {
    const { redirectToLogin } = this.state;
    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return <DashboardView onLogout={this.handleLogout} />;
  }
}

export default DashboardContainerView;
