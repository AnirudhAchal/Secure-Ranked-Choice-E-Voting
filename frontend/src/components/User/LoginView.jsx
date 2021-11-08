import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LoginView.css";
import { Link } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

class LoginView extends Component {
  render() {
    const {
      email,
      password,
      onSubmit,
      onEmailChange,
      onPasswordChange,
      validateForm,
    } = this.props;

    return (
      <div>
        <h1 className="text-center" style={{ paddingTop: "50px" }}>
          Welcome to NITK E-Voting!
        </h1>
        <h3 className="text-center" style={{ paddingTop: "30px" }}>
          Please Login to continue.
        </h3>
        <div className="Login">
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
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="login">
              <Button className="btn btn-dark" block size="lg" type="submit" disabled={!validateForm()}>
                Login
              </Button>
            </Form.Group>
            <Form.Group size="lg" controlId="register">
              <Form.Label>Don't have an account?&nbsp;</Form.Label>
              <Link to="/register">Register</Link>
              <Form.Label>Activation link expired?&nbsp;</Form.Label>
              <Link to="/verify-email">Resend link</Link>
              <Form.Label>Forgot password?&nbsp;</Form.Label>
              <Link to="/password-reset-email">Reset password</Link>
            </Form.Group>
          </Form>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default LoginView;
