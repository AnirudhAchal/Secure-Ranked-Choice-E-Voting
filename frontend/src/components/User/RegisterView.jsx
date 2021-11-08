import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/RegisterView.css";
import { NotificationContainer } from "react-notifications";

class RegisterView extends Component {
  render() {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      onSubmit,
      onUserNameChange,
      onFirstNameChange,
      onLastNameChange,
      onEmailChange,
      onPasswordChange,
      onConfirmPasswordChange,
      validateForm,
    } = this.props;

    return (
      <div>
        <h2 className="text-center" style={{ paddingTop: "60px" }}>
          Create a new account
        </h2>
        <div className="Register">
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={username}
                onChange={(e) => onUserNameChange(e.target.value)}
              />
            </Form.Group>
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
            <div className="row mb-4 my-3">
              <div className="col">
                <p className="small mb-0 text-muted">
                  *Password must have atleast 8 characters
                </p>
              </div>
            </div>
            <Button
              className="btn btn-dark"
              block
              size="lg"
              type="submit"
              disabled={!validateForm()}
            >
              Register
            </Button>
          </Form>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default RegisterView;
