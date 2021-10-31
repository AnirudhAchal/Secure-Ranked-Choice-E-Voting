import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardContainerView from "./components/DashboardContainerView";
import LoginContainerView from "./components/LoginContainerView";
import RegisterContainerView from "./components/RegisterContainerView";
import ElectionContainerView from "./components/ElectionContainerView";
import Result from "./components/Result";
import "react-notifications/lib/notifications.css";
import AdminDashboardContainerView from "./components/Admin/AdminDashboardContainerView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardContainerView} />
        <Route path="/login" component={LoginContainerView} />
        <Route path="/register" component={RegisterContainerView} />
        <Route exact path="/admin" component={AdminDashboardContainerView} />
        <Route path="/election/:id" component={ElectionContainerView} />
        <Route path="/result" component={Result} />
      </Switch>
    </Router>
  );
}

export default App;
