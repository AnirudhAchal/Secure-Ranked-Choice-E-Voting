import React, { Component } from "react";
import axiosInstance from "../../axios";
import ProfileView from "./ProfileView";

class ProfileContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      userHasLoaded: true,
      username: this.props.match.params.username,
    };
  }

  async componentDidMount() {
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
    const { user, userHasLoaded } = this.state;

    return <ProfileView userHasLoaded={userHasLoaded} user={user} />;
  }
}

export default ProfileContainerView;
