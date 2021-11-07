import React, { Component } from "react";
import LoginView from "./LoginView";
import axiosInstance from "../../axios";
import { Redirect } from "react-router";
import isAuthenticated from "../utils/authentication";
import { NotificationManager } from "react-notifications";

class LoginContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToDashboard: false,
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
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

  handleSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();

    axiosInstance
      .post("token/", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(res);
        this.setState({
          redirectToDashboard: true,
        });
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          err.response.data.detail,
          "Login Failed",
          5000
        );
      });
  }

  render() {
    const { email, password, redirectToDashboard } = this.state;

    if (redirectToDashboard) {
      return <Redirect to="/" />;
    }

    return (
      <LoginView
        email={email}
        password={password}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        validateForm={this.validateForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default LoginContainerView;