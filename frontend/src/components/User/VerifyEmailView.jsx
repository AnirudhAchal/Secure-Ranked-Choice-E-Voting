import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/VerifyEmailView.css";
import { NotificationContainer } from "react-notifications";

class VerifyEmailView extends Component {
  render() {
    const { email, onSubmit, onEmailChange, validateForm } = this.props;

    return (
      <div>
        <h3 className="text-center" style={{ paddingTop: "30px" }}>
          Activate your account by verifying your email
        </h3>
        <div className="VerifyEmail">
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
              <Button
                className="btn btn-dark"
                block
                size="lg"
                type="submit"
                disabled={!validateForm()}
              >
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

export default VerifyEmailView;
