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
      editingFirstName: false,
      editingLastName: false,
      editingAbout: false,
      firstName: "",
      lastName: "",
      about: "",
      searchText: "",
    };

    this.handleSaveFirstName = this.handleSaveFirstName.bind(this);
    this.handleSaveLastName = this.handleSaveLastName.bind(this);
    this.handleSaveAbout = this.handleSaveAbout.bind(this);

    this.handleEditFirstName = this.handleEditFirstName.bind(this);
    this.handleEditLastName = this.handleEditLastName.bind(this);
    this.handleEditAbout = this.handleEditAbout.bind(this);

    this.handleCancelFirstName = this.handleCancelFirstName.bind(this);
    this.handleCancelLastName = this.handleCancelLastName.bind(this);
    this.handleCancelAbout = this.handleCancelAbout.bind(this);

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
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          about: res.data.about,
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

  handleEditFirstName() {
    this.setState({
      editingFirstName: true,
    });
  }

  handleEditLastName() {
    this.setState({
      editingLastName: true,
    });
  }

  handleEditAbout() {
    this.setState({
      editingAbout: true,
    });
  }

  handleCancelFirstName() {
    const { user } = this.state;
    this.setState({
      editingFirstName: false,
      firstName: user.first_name,
    });
  }

  handleCancelLastName() {
    const { user } = this.state;
    this.setState({
      editingLastName: false,
      lastName: user.last_name,
    });
  }

  handleCancelAbout() {
    const { user } = this.state;
    this.setState({
      editingAbout: false,
      about: user.about,
    });
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

  handleSaveFirstName() {
    const { user, firstName } = this.state;
    user.first_name = firstName;

    axiosInstance
      .patch(`/authentication/current-user/${getCurrentUserId()}/`, user)
      .then((res) => {
        console.log(res);
        this.setState({
          editingFirstName: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSaveLastName() {
    const { user, lastName } = this.state;
    user.last_name = lastName;

    axiosInstance
      .patch(`/authentication/current-user/${getCurrentUserId()}/`, user)
      .then((res) => {
        console.log(res);
        this.setState({
          editingLastName: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSaveAbout() {
    const { user, about } = this.state;
    user.about = about;

    axiosInstance
      .patch(`/authentication/current-user/${getCurrentUserId()}/`, user)
      .then((res) => {
        console.log(res);
        this.setState({
          editingAbout: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      user,
      userHasLoaded,
      editingFirstName,
      editingLastName,
      editingAbout,
      firstName,
      lastName,
      about,
      searchText,
    } = this.state;

    return (
      <MyProfileView
        userHasLoaded={userHasLoaded}
        user={user}
        editingFirstName={editingFirstName}
        editingLastName={editingLastName}
        editingAbout={editingAbout}
        firstName={firstName}
        lastName={lastName}
        about={about}
        searchText={searchText}
        onChangeFirstName={this.handleChangeFirstName}
        onChangeLastName={this.handleChangeLastName}
        onChangeAbout={this.handleChangeAbout}
        onEditFirstName={this.handleEditFirstName}
        onEditLastName={this.handleEditLastName}
        onEditAbout={this.handleEditAbout}
        onCancelFirstName={this.handleCancelFirstName}
        onCancelLastName={this.handleCancelLastName}
        onCancelAbout={this.handleCancelAbout}
        onSaveFirstName={this.handleSaveFirstName}
        onSaveLastName={this.handleSaveLastName}
        onSaveAbout={this.handleSaveAbout}
        onChangeSearchText={this.handleChangeSearchText}
        onSearchProfile={this.handleSearchProfile}
      />
    );
  }
}

export default MyProfileContainerView;
