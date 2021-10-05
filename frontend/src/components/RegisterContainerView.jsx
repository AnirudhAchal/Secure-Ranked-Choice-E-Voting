import React, { Component } from "react";
import RegisterView from "./RegisterView";

class RegisterContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange =
      this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    const { firstname, lastname, email, password, confirmPassword } =
      this.state;
    return (
      firstname.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword === password
    );
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

  handleSubmit() {
    // Do backend api
    const { firstname, lastname, email, password, confirmPassword } =
      this.state;
    alert(
      `Firstname: ${firstname}\nLastName: ${lastname}\nEmail: ${email}\nPassword: ${password}\nConfirm Password: ${confirmPassword}\n`
    );
  }

  render() {
    const { firstname, lastname, email, password, confirmPassword } =
      this.state;
    return (
      <RegisterView
        firstname={firstname}
        lastname={lastname}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
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
