import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Auth } from "aws-amplify";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Messages from "./pages/Messages/Messages";
import EnhancedLogin from "./pages/Login/Login";
import EnhancedSignUp from "./pages/SignUp/SignUp";
import NavigateBar from "./components/NavigateBar/NavigateBar";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function Authenticate() {
    try {
      if (await Auth.currentSession()) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error !== "No current user") {
        alert(error);
      }
    }
  }

  Authenticate();

  return isAuthenticated ? (
    //Signed in
    <div>
      <Router id="top">
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/messages">
          <Messages />
        </Route>
        <NavigateBar />
      </Router>
    </div>
  ) : (
    //NOT signed in
    <div>
      <Router className="d-flex flex-column justify-content-between align-items-center">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <EnhancedLogin />
        </Route>
        <Route exact path="/signup">
          <EnhancedSignUp />
        </Route>
      </Router>
    </div>
  );
}

export default App;
