import React, { Component } from "react";
import NavbarContainerView from "./NavbarContainerView";

class ProfileView extends Component {
  render() {
    const { userHasLoaded } = this.props;

    if (!userHasLoaded) {
      return null;
    }

    const { user } = this.props;
    // contians all user details
    console.log(user);
    return (
      <div>
        <NavbarContainerView />
        <center>
          <h1>Profile Page</h1>
          <h2>{user.email}</h2>
          <h2>{user.user_name}</h2>
          <h2>{user.first_name}</h2>
          <h2>{user.last_name}</h2>
          <h2>{user.about}</h2>
        </center>
      </div>
    );
  }
}

export default ProfileView;
