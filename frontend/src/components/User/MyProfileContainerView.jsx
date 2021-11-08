import React, { Component } from "react";
import axiosInstance from "../../axios";
import getCurrentUserId from "../utils/user";
import MyProfileView from "./MyProfileView";

class MyProfileContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userHasLoaded: true,
      firstName: "",
      lastName: "",
      about: "",
      searchText: "",
    };

    this.handleSave = this.handleSave.bind(this);

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeAbout = this.handleChangeAbout.bind(this);
    this.handleChangeSearchText = this.handleChangeSearchText.bind(this);

    this.handleSearchProfile = this.handleSearchProfile.bind(this);
  }

  async componentDidMount() {
    axiosInstance
      .get(`/authentication/current-user/${getCurrentUserId()}/`)
      .then((res) => {
        this.setState({
          user: res.data,
          userHasLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeSearchText(searchText) {
    this.setState({
      searchText: searchText,
    });
  }

  handleSearchProfile() {
    const { searchText } = this.state;
    window.location.href = `/profile/${searchText}`;
  }

  handleChangeFirstName(firstName) {
    this.setState({
      firstName: firstName,
    });
  }

  handleChangeLastName(lastName) {
    this.setState({
      lastName: lastName,
    });
  }

  handleChangeAbout(about) {
    this.setState({
      about: about,
    });
  }

  handleSave() {
    const { user, firstName, lastName, about } = this.state;
    if (firstName !== "") user.first_name = firstName;
    if (lastName !== "") user.last_name = lastName;
    if (about !== "") user.about = about;

    axiosInstance
      .patch(`/authentication/current-user/${getCurrentUserId()}/`, user)
      .then((res) => {
        this.setState({
          editingFirstName: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { user, userHasLoaded, firstName, lastName, about, searchText } =
      this.state;

    return (
      <MyProfileView
        userHasLoaded={userHasLoaded}
        user={user}
        firstName={firstName}
        lastName={lastName}
        about={about}
        searchText={searchText}
        onChangeFirstName={this.handleChangeFirstName}
        onChangeLastName={this.handleChangeLastName}
        onChangeAbout={this.handleChangeAbout}
        onSave={this.handleSave}
        onChangeSearchText={this.handleChangeSearchText}
        onSearchProfile={this.handleSearchProfile}
      />
    );
  }
}

export default MyProfileContainerView;
