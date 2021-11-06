import React, { Component } from "react";

class MyProfileView extends Component {
  renderFirstName() {
    const {
      user,
      firstName,
      editingFirstName,
      onChangeFirstName,
      onSaveFirstName,
      onCancelFirstName,
      onEditFirstName,
    } = this.props;

    if (editingFirstName) {
      return (
        <div>
          <button onClick={onSaveFirstName}>Save</button>
          <button onClick={onCancelFirstName}>Cancel</button>

          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => onChangeFirstName(e.target.value)}
          />
        </div>
      );
    }

    return (
      <div>
        <button onClick={(e) => onEditFirstName(e)}>Edit</button>
        <h3>First Name: {user.first_name}</h3>
      </div>
    );
  }

  renderLastName() {
    const {
      user,
      lastName,
      editingLastName,
      onChangeLastName,
      onSaveLastName,
      onCancelLastName,
      onEditLastName,
    } = this.props;

    if (editingLastName) {
      return (
        <div>
          <button onClick={onSaveLastName}>Save</button>
          <button onClick={onCancelLastName}>Cancel</button>

          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => onChangeLastName(e.target.value)}
          />
        </div>
      );
    }

    return (
      <div>
        <button onClick={(e) => onEditLastName(e)}>Edit</button>
        <h3>Last Name: {user.last_name}</h3>
      </div>
    );
  }

  renderAbout() {
    const {
      user,
      about,
      editingAbout,
      onChangeAbout,
      onSaveAbout,
      onCancelAbout,
      onEditAbout,
    } = this.props;

    if (editingAbout) {
      return (
        <div>
          <button onClick={onSaveAbout}>Save</button>
          <button onClick={onCancelAbout}>Cancel</button>

          <input
            type="text"
            id="about"
            name="about"
            value={about}
            onChange={(e) => onChangeAbout(e.target.value)}
          />
        </div>
      );
    }

    return (
      <div>
        <button onClick={(e) => onEditAbout(e)}>Edit</button>
        <h3>About: {user.about}</h3>
      </div>
    );
  }

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
    const { user, userHasLoaded } = this.props;

    if (!userHasLoaded) {
      return null;
    }

    return (
      <div>
        <center>
          <h1>Profile Page</h1>
          {this.renderSearchBar()}
          <h3>Email: {user.email}</h3>
          <h3>Username: {user.user_name}</h3>
          {this.renderFirstName()}
          {this.renderLastName()}
          {this.renderAbout()}
        </center>
      </div>
    );
  }
}

export default MyProfileView;
