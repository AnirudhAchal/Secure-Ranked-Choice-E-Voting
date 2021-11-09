import React, { Component } from "react";
import axiosInstance from "../../axios";
import { Redirect } from "react-router";
import isAuthenticated from "../utils/authentication";
import { NotificationManager } from "react-notifications";
import PasswordResetEmailView from "./PasswordResetEmailView";
import getErrorMessage from "../utils/response";

class PasswordResetEmailContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      redirectToDashboard: false,
      redirectToLogin: false,
      disableSubmit: false,
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
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
    const { email, disableSubmit } = this.state;
    return email.length > 0 && !disableSubmit;
  }

  handleEmailChange(email) {
    this.setState({
      email,
    });
  }

  handleSubmit(event) {
    const { email } = this.state;
    event.preventDefault();

    this.setState({
      disableSubmit: true,
    });

    axiosInstance
      .post("/authentication/password-reset-email/", {
        email: email,
      })
      .then((res) => {
        this.setState({
          redirectToLogin: true,
          disableSubmit: false,
        });

        NotificationManager.success(
          "A temporary password has been sent to your email.",
          "Successful",
          5000
        );
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          getErrorMessage(err),
          "Password Reset Failed",
          5000
        );
        this.setState({
          disableSubmit: false,
        });
      });
  }

  render() {
    const { email, redirectToDashboard, redirectToLogin } = this.state;

    if (redirectToDashboard) {
      return <Redirect to="/" />;
    }

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <PasswordResetEmailView
        email={email}
        onEmailChange={this.handleEmailChange}
        validateForm={this.validateForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default PasswordResetEmailContainerView;
