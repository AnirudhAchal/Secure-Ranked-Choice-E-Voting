import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import DashboardContainerView from "./components/Dashboard/DashboardContainerView";
import LoginContainerView from "./components/User/LoginContainerView";
import RegisterContainerView from "./components/User/RegisterContainerView";
import ElectionContainerView from "./components/Election/ElectionContainerView";
import AdminDashboardContainerView from "./components/Admin/AdminDashboardContainerView";
import OngoingElectionContainerView from "./components/Election/OngoingElectionContainerView";
import UpcomingElectionContainerView from "./components/Election/UpcomingElectionContainerView";
import CompletedElectionContainerView from "./components/Election/CompletedElectionContainerView";
import ProfileContainerView from "./components/Dashboard/ProfileContainerView";
import VerifyEmailContainerView from "./components/User/VerifyEmailContainerView";
import MyProfileContainerView from "./components/User/MyProfileContainerView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardContainerView} />
        <Route path="/login" component={LoginContainerView} />
        <Route path="/register" component={RegisterContainerView} />
        <Route path="/verify-email" component={VerifyEmailContainerView} />
        <Route path="/admin" component={AdminDashboardContainerView} />
        <Route path="/election/:id" component={ElectionContainerView} />
        <Route path="/ongoing" component={OngoingElectionContainerView} />
        <Route path="/upcoming" component={UpcomingElectionContainerView} />
        <Route path="/completed" component={CompletedElectionContainerView} />
        <Route path="/profile/:username" component={ProfileContainerView} />
        <Route path="/myprofile" component={MyProfileContainerView} />
      </Switch>
    </Router>
  );
}

export default App;
