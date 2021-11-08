import React, { Component } from "react";
import axiosInstance from "../../axios";
import { Redirect } from "react-router";
import isAuthenticated from "../utils/authentication";
import { NotificationManager } from "react-notifications";
import VerifyEmailView from "./VerifyEmailView";
import getErrorMessage from "../utils/response";

class VerifyEmailContainerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      redirectToDashboard: false,
      redirectToLogin: false,
      token: this.props.match.params.token,
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { token } = this.state;

    if (isAuthenticated()) {
      this.setState({
        redirectToDashboard: true,
      });
    }

    if (token) {
      axiosInstance
        .get(`/authentication/verify-email/?token=${token}`)
        .then((res) => {
          console.log(res);

          this.setState({
            redirectToLogin: true,
          });

          NotificationManager.success(
            res.data.message,
            "Verification Successful",
            5000
          );
        })
        .catch((err) => {
          console.log(err);

          NotificationManager.error(
            getErrorMessage(err),
            "Verification Failed",
            5000
          );

          this.setState({
            token: "",
          });
        });
    }
  }

  validateForm() {
    const { email } = this.state;
    return email.length > 0;
  }

  handleEmailChange(email) {
    this.setState({
      email,
    });
  }

  handleSubmit(event) {
    const { email } = this.state;
    event.preventDefault();

    axiosInstance
      .post("/authentication/resend-verification-email/", {
        email: email,
      })
      .then((res) => {
        this.setState({
          redirectToLogin: true,
        });

        NotificationManager.success(
          "A new verification link has been sent to your email.",
          "Resend Successful",
          5000
        );
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(getErrorMessage(err), "Resend Failed", 5000);
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
      <VerifyEmailView
        email={email}
        onEmailChange={this.handleEmailChange}
        validateForm={this.validateForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default VerifyEmailContainerView;
