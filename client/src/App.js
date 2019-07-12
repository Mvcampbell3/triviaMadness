import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home"
import Lost from "./pages/Lost"
import Login from "./pages/Login"

class App extends Component {
  state = {
    user: false,
    username: "",
    email: "",
    password: "",
    signup: false
  }

  loginUser = () => {

  }

  signupUser = () => {

  }

  checkAuth = () => {

  }

  switchSignup = () => {
    this.setState({ signup: !this.state.signup })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact render={props => <Login
            email={this.state.email}
            password={this.state.password}
            username={this.state.username}
            signup={this.state.signup}
            switchSignup={this.switchSignup}
            handleInputChange={this.handleInputChange}
          />} />
          <Route component={Lost} />
        </Switch>
      </Router>
    );
  }
}

export default App;
