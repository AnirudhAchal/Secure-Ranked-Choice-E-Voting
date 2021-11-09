import React, { Component } from "react";
import RegisterView from "./RegisterView";
import axiosInstance from "../../axios";
import { Redirect } from "react-router";
import isAuthenticated from "../utils/authentication";
import { NotificationManager } from "react-notifications";
import getErrorMessage from "../utils/response";

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
      redirectToLogin: false,
      disableSubmit: false,
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

  async componentDidMount() {
    if (isAuthenticated()) {
      this.setState({
        redirectToDashboard: true,
      });
    }
  }

  validateForm() {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      disableSubmit,
    } = this.state;

    return (
      username.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword === password &&
      !disableSubmit
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

    this.setState({
      disableSubmit: true,
    });

    axiosInstance
      .post("authentication/register/", {
        email: email,
        user_name: username,
        first_name: firstname,
        last_name: lastname,
        password: password,
      })
      .then((res) => {
        this.setState({
          redirectToLogin: true,
          disableSubmit: false,
        });
        NotificationManager.success(
          "A verification link has been sent to your account.",
          "Registration Successful",
          5000
        );
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          getErrorMessage(err),
          "Registration Failed",
          5000
        );
        this.setState({
          disableSubmit: false,
        });
      });
  }

  render() {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      redirectToLogin,
    } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

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
