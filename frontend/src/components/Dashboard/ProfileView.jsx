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

    let av;
    av = user.first_name + " " + user.last_name;
    return (
      <div>
        <NavbarContainerView />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
              <div className="my-4"></div>
              <div className="row mt-5 align-items-center">
                <div className="col">
                  <div className="row align-items-center">
                    <Avatar color="#404040" round="true" name={av} />
                    <div className="col-md-7">
                      <h4 className="mb-1">
                        {user.first_name} {user.last_name}
                      </h4>
                    </div>
                  </div>
                  <div className="row mb-4 my-3">
                    <div className="col-md-7">
                      <p className="text-muted">{user.about}</p>
                    </div>
                    <div className="col">
                      <p className="small mb-0 text-muted">
                        Username: {user.user_name}
                      </p>
                      <p className="small mb-0 text-muted">
                        Email: {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
