import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarContainerView from "../Dashboard/NavbarContainerView";
import Avatar from "react-avatar";

class MyProfileView extends Component {
  renderSearchBar() {
    const { onChangeSearchText, searchText, onSearchProfile } = this.props;
    return (
      <div>
        <button onClick={onSearchProfile}>Search Profile</button>
        <input
          type="text"
          id="searchBar"
          name="searchBar"
          value={searchText}
          onChange={(e) => onChangeSearchText(e.target.value)}
        />
      </div>
    );
  }

  render() {
    const {
      user,
      userHasLoaded,
      onChangeFirstName,
      onChangeLastName,
      onChangeAbout,
      onSave,
      firstName,
      lastName,
      about,
    } = this.props;
    let av;
    av = user.first_name + " " + user.last_name;
    if (!userHasLoaded) {
      return null;
    }
    console.log(user);
    return (
      <div>
        <NavbarContainerView />

        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8 mx-auto">
              <div class="my-4">
                <form>
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
                          <p class="small mb-0 text-muted">
                            Email: {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="firstname">Firstname</label>
                      <input
                        type="text"
                        id="firstname"
                        class="form-control"
                        placeholder={user.first_name}
                        value={firstName}
                        onChange={(e) => onChangeFirstName(e.target.value)}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="lastname">Lastname</label>
                      <input
                        type="text"
                        id="lastname"
                        class="form-control"
                        placeholder={user.last_name}
                        value={lastName}
                        onChange={(e) => onChangeLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputAddress5">About</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputAddress5"
                      placeholder={user.about}
                      value={about}
                      onChange={(e) => onChangeAbout(e.target.value)}
                    />
                  </div>
                  <hr class="my-4" />
                  <button type="submit" class="btn btn-dark" onClick={onSave}>
                    Save Changes
                  </button>
                  <Link class="btn btn-dark mx-3" to="/password-reset">
                    Reset Password
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfileView;
