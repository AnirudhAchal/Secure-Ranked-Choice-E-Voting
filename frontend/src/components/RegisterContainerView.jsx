import React, { Component } from "react";
import RegisterView from "./RegisterView";
import axiosInstance from "../axios";

class RegisterContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange =
      this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    const { username, firstname, lastname, email, password, confirmPassword } =
      this.state;
    return (
      username.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword === password
    );
  }

  handleUserNameChange(username) {
    this.setState({
      username,
    });
  }

  handleFirstNameChange(firstname) {
    this.setState({
      firstname,
    });
  }

  handleLastNameChange(lastname) {
    this.setState({
      lastname,
    });
  }

  handleEmailChange(email) {
    this.setState({
      email,
    });
  }

  handlePasswordChange(password) {
    this.setState({
      password,
    });
  }

  handleConfirmPasswordChange(confirmPassword) {
    this.setState({
      confirmPassword,
    });
  }

  handleSubmit(event) {
    const { username, firstname, lastname, email, password } = this.state;
    event.preventDefault();
    axiosInstance
      .post("authentication/register/", {
        email: email,
        user_name: username,
        first_name: firstname,
        last_name: lastname,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  render() {
    const { username, firstname, lastname, email, password, confirmPassword } =
      this.state;
    return (
      <RegisterView
        username={username}
        firstname={firstname}
        lastname={lastname}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onUserNameChange={this.handleUserNameChange}
        onFirstNameChange={this.handleFirstNameChange}
        onLastNameChange={this.handleLastNameChange}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onConfirmPasswordChange={this.handleConfirmPasswordChange}
        validateForm={this.validateForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default RegisterContainerView;
