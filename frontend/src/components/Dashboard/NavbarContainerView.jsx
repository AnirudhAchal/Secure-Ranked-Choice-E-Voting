import React, { Component } from "react";
import axiosInstance from "../../axios";
import { Redirect } from "react-router";
import isAuthenticated from "../utils/authentication";
import NavbarView from "./NavbarView";

class NavbarContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    if (!isAuthenticated()) {
      this.setState({
        redirectToLogin: true,
      });
    }
  }

  handleLogout() {
    axiosInstance
      .post("authentication/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
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
    const { redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return <NavbarView onLogout={this.handleLogout} />;
  }
}

export default NavbarContainerView;
