import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home"
import Lost from "./pages/Lost"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Home />} />
          <Route component={Lost} />
        </Switch>
      </Router>
    );
  }
}

export default App;
