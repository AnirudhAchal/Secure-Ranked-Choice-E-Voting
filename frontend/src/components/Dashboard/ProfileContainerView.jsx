import React, { Component } from "react";
import { Redirect } from "react-router";
import axiosInstance from "../../axios";
import isAuthenticated from "../utils/authentication";
import ProfileView from "./ProfileView";

class ProfileContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      userHasLoaded: true,
      redirectToLogin: false,
      username: this.props.match.params.username,
    };
  }

  async componentDidMount() {
    if (!isAuthenticated()) {
      this.setState({
        redirectToLogin: true,
      });
    }

    const { username } = this.state;

    axiosInstance
      .get(`/authentication/user/${username}/`)
      .then((res) => {
        this.setState({ user: res.data, userHasLoaded: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { redirectToLogin, user, userHasLoaded } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return <ProfileView userHasLoaded={userHasLoaded} user={user} />;
  }
}

export default ProfileContainerView;
