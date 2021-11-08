import React, { Component } from "react";
import axiosInstance from "../../axios";
import { NotificationManager } from "react-notifications";
import PasswordResetView from "./PasswordResetView";
import getCurrentUserId from "../utils/user";
import getErrorMessage from "../utils/response";

class PasswordResetContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
    };

    this.validateForm = this.validateForm.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange =
      this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    const { password, confirmPassword } = this.state;
    return password.length > 0 && confirmPassword === password;
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
    const { password } = this.state;
    event.preventDefault();

    axiosInstance
      .patch(`authentication/password-reset/${getCurrentUserId()}/`, {
        password: password,
      })
      .then((res) => {
        NotificationManager.success(
          "Your password has been successfully reset.",
          "Reset Successful",
          5000
        );
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(getErrorMessage(err), "Reset", 5000);
      });
  }

  render() {
    const { password, confirmPassword } = this.state;

    return (
      <PasswordResetView
        password={password}
        confirmPassword={confirmPassword}
        onPasswordChange={this.handlePasswordChange}
        onConfirmPasswordChange={this.handleConfirmPasswordChange}
        validateForm={this.validateForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default PasswordResetContainerView;
