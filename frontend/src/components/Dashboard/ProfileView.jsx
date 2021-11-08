import React, { Component } from "react";
import NavbarContainerView from "./NavbarContainerView";
import Avatar from "react-avatar";

class ProfileView extends Component {
  render() {
    const { userHasLoaded } = this.props;

    if (!userHasLoaded) {
      return null;
    }

    const { user } = this.props;
    // contians all user details
    console.log(user);
    let av;
    av = user.first_name + " " + user.last_name;
    return (
      <div>
        <NavbarContainerView />
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8 mx-auto">
              <div class="my-4"></div>
              <div class="row mt-5 align-items-center">
                <div class="col">
                  <div class="row align-items-center">
                    <Avatar color="#404040" round="true" name={av} />
                    <div class="col-md-7">
                      <h4 class="mb-1">
                        {user.first_name} {user.last_name}
                      </h4>
                    </div>
                  </div>
                  <div class="row mb-4 my-3">
                    <div class="col-md-7">
                      <p class="text-muted">{user.about}</p>
                    </div>
                    <div class="col">
                      <p class="small mb-0 text-muted">
                        Username: {user.user_name}
                      </p>
                      <p class="small mb-0 text-muted">Email: {user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
