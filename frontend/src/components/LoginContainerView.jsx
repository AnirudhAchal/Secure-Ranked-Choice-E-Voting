import React, { Component } from "react";
import LoginView from "./LoginView";

class LoginContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    // Do backend api
    const { email, password } = this.state;
    console.log(email + " " + password);
  }

  render() {
    const { password, email } = this.state;
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
