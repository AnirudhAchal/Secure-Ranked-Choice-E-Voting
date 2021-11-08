import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/PasswordResetView.css";
import { NotificationContainer } from "react-notifications";
import NavbarContainerView from "../Dashboard/NavbarContainerView";

class PasswordResetView extends Component {
  render() {
    const {
      password,
      confirmPassword,
      onSubmit,
      onPasswordChange,
      onConfirmPasswordChange,
      validateForm,
    } = this.props;

    return (
      <div>
        <NavbarContainerView />
        <h2 className="text-center" style={{ paddingTop: "60px" }}>
          Reset your password
        </h2>
        <div className="PasswordReset">
          <Form onSubmit={(e) => onSubmit(e)}>
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
            <Button block className="btn btn-dark" size="lg" type="submit" disabled={!validateForm()}>
              Reset
            </Button>
          </Form>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default PasswordResetView;
