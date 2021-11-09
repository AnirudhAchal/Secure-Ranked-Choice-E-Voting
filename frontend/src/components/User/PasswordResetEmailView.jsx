import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/PasswordResetEmailView.css";
import { NotificationContainer } from "react-notifications";

class PasswordResetEmailView extends Component {
  render() {
    const { email, onSubmit, onEmailChange, validateForm } = this.props;

    return (
      <div>
        <h3 className="text-center" style={{ paddingTop: "30px" }}>
          Enter your account email to reset your password
        </h3>
        <div className="PasswordResetEmail">
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
            <Form.Group size="lg" controlId="resendLink">
              <Button className="btn btn-dark" block size="lg" type="submit" disabled={!validateForm()}>
                Resend link
              </Button>
            </Form.Group>
          </Form>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default PasswordResetEmailView;
