import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles/Register.css";

class RegisterView extends Component {
  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      onSubmit,
      onFirstNameChange,
      onLastNameChange,
      onEmailChange,
      onPasswordChange,
      onConfirmPasswordChange,
      validateForm,
    } = this.props;

    return (
      <div className="Register">
        <Form onSubmit={onSubmit}>
          <Form.Group size="lg" controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={firstname}
              onChange={(e) => onFirstNameChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={lastname}
              onChange={(e) => onLastNameChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="comfirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default RegisterView;
