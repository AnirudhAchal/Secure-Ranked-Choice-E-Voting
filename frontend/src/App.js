import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import DashboardContainerView from "./components/DashboardContainerView";
import LoginContainerView from "./components/LoginContainerView";
import RegisterContainerView from "./components/RegisterContainerView";

function App() {
  const authenitcated = false;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenitcated ? (
            <DashboardContainerView />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login" component={LoginContainerView} />
        <Route path="/register" component={RegisterContainerView} />
      </Switch>
    </Router>
  );
}

export default App;
