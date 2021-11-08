import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarContainerView from "../Dashboard/NavbarContainerView";
import Avatar from "react-avatar";
import "../styles/MyProfileView.css";
class MyProfileView extends Component {
  renderSearchBar() {
    const { onChangeSearchText, searchText, onSearchProfile } = this.props;
    return (
      <div>
        <div className="container">
          <div className="my-3 row float-right ">
            <div className="col">
              <div className="search">
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchText}
                  onChange={(e) => onChangeSearchText(e.target.value)}
                ></input>{" "}
                <button
                  type="submit"
                  className="btn bg-transparent"
                  onClick={onSearchProfile}
                >
                  <i className="fa fa-search"></i>
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
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
    return (
      <div>
        <NavbarContainerView />
        <div align="right">{this.renderSearchBar()}</div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
              <div className="my-4">
                <form>
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
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="firstname">Firstname</label>
                      <input
                        type="text"
                        id="firstname"
                        className="form-control"
                        placeholder={user.first_name}
                        value={firstName}
                        onChange={(e) => onChangeFirstName(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lastname">Lastname</label>
                      <input
                        type="text"
                        id="lastname"
                        className="form-control"
                        placeholder={user.last_name}
                        value={lastName}
                        onChange={(e) => onChangeLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress5">About</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress5"
                      placeholder={user.about}
                      value={about}
                      onChange={(e) => onChangeAbout(e.target.value)}
                    />
                  </div>
                  <hr className="my-4" />
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={onSave}
                  >
                    Save Changes
                  </button>
                  <Link className="btn btn-dark mx-3" to="/password-reset">
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
