import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardContainerView from "./components/DashboardContainerView";
import LoginContainerView from "./components/LoginContainerView";
import RegisterContainerView from "./components/RegisterContainerView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardContainerView} />
        <Route path="/login" component={LoginContainerView} />
        <Route path="/register" component={RegisterContainerView} />
      </Switch>
    </Router>
  );
}

export default App;
