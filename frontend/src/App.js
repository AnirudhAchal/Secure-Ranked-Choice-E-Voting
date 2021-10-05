import React from "react";
import { BrowserRouter as router, Switch, Route } from "react-router-dom";
import LoginContainerView from "./components/LoginContainerView";
import RegisterContainerView from "./components/RegisterContainerView";

function App() {
  return (
    <div>
      <RegisterContainerView />
      <LoginContainerView />
    </div>
  );
}

export default App;
