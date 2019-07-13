import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import API from "./utils/API"

import Home from "./pages/Home"
import Lost from "./pages/Lost"
import Login from "./pages/Login"
import GameSelection from "./pages/GameSelection";
import Game from "./pages/Game"

class App extends Component {
  state = {
    user: false,
    username: "",
    email: "",
    password: "",
    id: "",
    signup: false,
    gameSelectID: ""
  }

  componentDidMount() {
    this.checkAuth();
  }

  logoutUser = () => {
    localStorage.removeItem("token");
    this.setState({ user: false, username: "", id: "", password: "", email: "" })
  }

  loginUser = () => {
    localStorage.removeItem("token")
    API.loginUser(this.state.email, this.state.password)
      .then(result => {
        console.log(result.data);
        this.setState({ user: true, username: result.data.username })
        localStorage.setItem("token", result.data.token)
      })
      .catch(err => {
        console.log(err)
      })
  }

  signupUser = () => {
    API.signupUser(this.state.email, this.state.username, this.state.password)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  checkAuth = () => {
    if (localStorage.getItem("token")) {
      console.log("has token");
      API.checkAuth()
        .then(result => {
          console.log(result.data)
          if (!result.data.user) {
            localStorage.removeItem("token")
            // reroute to login page
          } else {
            this.setState({ user: true, username: result.data.username, id: result.data.id })
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log("no token saved")
    }
  }

  switchSignup = () => {
    this.setState({ signup: !this.state.signup })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderRedirect = () => {
    if (this.state.user) {
      return <Redirect to='/' />
    }
  }

  handleGameSelect = e => {
    this.setState({ gameSelectID: e.target.dataset.game_id })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Home user={this.state.user} logoutUser={this.logoutUser} />} />
          <Route path="/login" exact render={props => <Login
            user={this.state.user}
            renderRedirect={this.renderRedirect}
            email={this.state.email}
            password={this.state.password}
            username={this.state.username}
            signup={this.state.signup}
            switchSignup={this.switchSignup}
            handleInputChange={this.handleInputChange}
            loginUser={this.loginUser}
            signupUser={this.signupUser}
          />} />
          <Route path="/games" exact render={props => <GameSelection
            renderRedirectLogin={this.renderRedirectLogin}
            user={this.state.user}
            gameSelectID={this.state.gameSelectID}
            handleGameSelect={this.handleGameSelect}
          />} />
          <Route path="/playgame" exact render={props => <Game gameSelectID={this.state.gameSelectID} />} />
          <Route component={Lost} />
        </Switch>
      </Router>
    );
  }
}

export default App;
