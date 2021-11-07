import React, { Component } from "react";
import DashboardView from "./DashboardView";

class DashboardContainerView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <DashboardView />;
  }
}

export default DashboardContainerView;
