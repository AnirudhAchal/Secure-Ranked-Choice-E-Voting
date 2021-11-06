import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import DashboardContainerView from "./components/DashboardContainerView";
import LoginContainerView from "./components/LoginContainerView";
import RegisterContainerView from "./components/RegisterContainerView";
import ElectionContainerView from "./components/ElectionContainerView";
import "react-notifications/lib/notifications.css";
import AdminDashboardContainerView from "./components/Admin/AdminDashboardContainerView";
import OngoingElectionContainerView from "./components/OngoingElectionContainerView";
import UpcomingElectionContainerView from "./components/UpcomingElectionContainerView";
import CompletedElectionContainerView from "./components/CompletedElectionContainerView";
import AdminElectionContainerView from "./components/Admin/AdminElectionContainerView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardContainerView} />
        <Route path="/login" component={LoginContainerView} />
        <Route path="/register" component={RegisterContainerView} />
        <Route path="/election/:id" component={ElectionContainerView} />
        <Route path="/ongoing" component={OngoingElectionContainerView} />
        <Route path="/upcoming" component={UpcomingElectionContainerView} />
        <Route path="/completed" component={CompletedElectionContainerView} />
        <Route path="/admin" component={AdminDashboardContainerView} />
        <Route path= "/admin/election/:id" component={AdminElectionContainerView} />
      </Switch>
    </Router>
  );
}

export default App;
