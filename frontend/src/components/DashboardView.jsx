import React, { Component } from "react";

class DashboardView extends Component {
  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }
}

export default DashboardView;
