import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import API from "./utils/API"

import Home from "./pages/Home"
import Lost from "./pages/Lost"
import Login from "./pages/Login"
import GameSelection from "./pages/GameSelection";
import Game from "./pages/Game"
import CreateGame from "./pages/CreateGame"
import ResultPage from "./pages/ResultPage"

import Message from "./components/Message"

class App extends Component {
  state = {
    user: null,
    username: "",
    email: "",
    password: "",
    id: "",
    signup: false,
    showSignup: false,
    gameSelectID: "",
    sendHome: false,
    gameResult: {},
    quizTitle: "",
    failedLogin: false,
    checkedAuth: false,
    justSigned: false,
    showMessage: false,
    messageTitle: "",
    messageContent: "",
    sendGames: false,
    sendCreate: false
  }

  componentDidMount() {
    this.checkAuth();
  }

  logoutUser = () => {
    localStorage.removeItem("token-trivia-madness");
    this.setState({ user: false, username: "", id: "", password: "", email: "", sendHome: true });
  }

  resetSendHome = () => {
    if (this.state.sendHome) {
      this.setState({ sendHome: false })
    }
  }

  loginUser = () => {
    localStorage.removeItem("token-trivia-madness")
    API.loginUser(this.state.email, this.state.password)
      .then(result => {
        console.log(result.data);
        if (result.data !== false) {
          this.setState({ user: true, username: result.data.username, failedLogin: false, justSigned: false })
          localStorage.setItem("token-trivia-madness", result.data.token)
        } else {
          // alert("Wrong email or password");
          this.setState({ password: "", failedLogin: true })
        }

      })
      .catch(err => {
        console.log(err)
        this.setState({ password: "", failedLogin: true })
      })
  }

  signupUser = () => {
    API.signupUser(this.state.email, this.state.username, this.state.password)
      .then(result => {
        console.log(result);
        if (result.data.username === this.state.username) {
          this.setState(prevState => {
            prevState.showSignup = false;
            prevState.justSigned = true;
            return prevState;
          }, () => {
            setTimeout(() => {
              this.setState({ signup: false })
            }, 280)
          });
        }
      })
      .catch(err => {
        // if mongo dup error, code 11000
        // need to have a large tree of if err.whatwhatthis
        const which = err.response;
        console.log(which)
        if (which.data.code === 11000) {
          console.log("This is a dup email/username error");
          return this.setState({ showMessage: true, messageContent: "Email and/or username already taken", messageTitle: "Opps" })
        } else if (which.data.errors.email) {
          console.log("This has an email error")
          return this.setState({ showMessage: true, messageContent: "Not a valid email address", messageTitle: "Opps" })
        }
        this.setState({ showMessage: true, messageContent: "Something went wrong", messageTitle: "Opps" })
      })
  }

  removeUser = () => {
    this.setState({ user: false, checkedAuth: true, sendHome: true })
  }

  checkAuth = () => {
    if (localStorage.getItem("token-trivia-madness")) {
      console.log("has token");
      API.checkAuth()
        .then(result => {
          console.log(result.data)
          if (!result.data.user) {
            localStorage.removeItem("token-trivia-madness")
            this.setState({ user: false, checkedAuth: true })
            // reroute to login page
          } else {
            this.setState({ user: true, username: result.data.username, id: result.data.id, checkedAuth: true })
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log("no token saved")
      this.setState({ user: false, checkedAuth: true })
    }
  }

  scrollTopPage = () => {
    window.scrollTo(0, 0);
  }

  switchSignup = () => {
    if (this.state.signup) {
      this.setState(prevState => {
        prevState.showSignup = false;
        return prevState;
      }, () => {
        setTimeout(() => {
          this.setState({ signup: !this.state.signup, failedLogin: false })
        }, 280)
      })
    } else {
      this.setState({ signup: !this.state.signup, showSignup: !this.state.showSignup, failedLogin: false })
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderRedirect = () => {
    if (this.state.user) {
      return <Redirect to='/' />
    }
  }

  resultToHome = () => {
    if (!this.state.gameResult.username) {
      return <Redirect to="/" />
    }
  }

  handleGameSelect = e => {
    this.setState({ gameSelectID: e.target.dataset.game_id })
  }

  handleGameResult = (result, title, cb) => {
    this.setState({ gameResult: result, quizTitle: title });
    this.setState(prevState => {
      prevState.gameResult = result;
      prevState.quizTitle = title
    }, cb())
  }

  handleClearMessage = () => {
    this.setState({ showMessage: false, messageContent: "", messageTitle: "" })
  }

  render() {
    return (
      <Router>
        <div className="background">
          <Message
            showMessage={this.state.showMessage}
            messageContent={this.state.messageContent}
            messageTitle={this.state.messageTitle}
            handleClearMessage={this.handleClearMessage}
          />
          <Switch>
            <Route path="/" exact render={props => <Home
              user={this.state.user}
              logoutUser={this.logoutUser}
              sendHome={this.state.sendHome}
              resetSendHome={this.resetSendHome}
              username={this.state.username}
              checkedAuth={this.state.checkedAuth}
              checkAuth={this.checkAuth}
              rotateBoxes={this.rotateBoxes}
            />} />
            <Route path="/login" exact render={props => <Login
              user={this.state.user}
              logoutUser={this.logoutUser}
              renderRedirect={this.renderRedirect}
              email={this.state.email}
              password={this.state.password}
              username={this.state.username}
              signup={this.state.signup}
              switchSignup={this.switchSignup}
              handleInputChange={this.handleInputChange}
              loginUser={this.loginUser}
              signupUser={this.signupUser}
              failedLogin={this.state.failedLogin}
              justSigned={this.state.justSigned}
              showSignup={this.state.showSignup}
              showMessage={this.state.showMessage}
              messageContent={this.state.messageContent}
              messageTitle={this.state.messageTitle}
              handleClearMessage={this.handleClearMessage}
            />} />
            <Route path="/games" exact render={props => <GameSelection
              renderRedirectLogin={this.renderRedirectLogin}
              user={this.state.user}
              logoutUser={this.logoutUser}
              gameSelectID={this.state.gameSelectID}
              handleGameSelect={this.handleGameSelect}
              sendHome={this.state.sendHome}
              removeUser={this.removeUser}
            />} />
            <Route path="/playgame" exact render={props => <Game
              user={this.state.user}
              logoutUser={this.logoutUser}
              gameSelectID={this.state.gameSelectID}
              handleGameResult={this.handleGameResult}
            />} />
            <Route path="/creategame" exact render={props => <CreateGame
              user={this.state.user}
              username={this.state.username}
              logoutUser={this.logoutUser}
            />} />
            <Route path="/resultpage" exact render={props => <ResultPage
              user={this.state.user}
              logoutUser={this.logoutUser}
              gameResult={this.state.gameResult}
              resultToHome={this.resultToHome}
              title={this.state.quizTitle}
              scrollTopPage={this.scrollTopPage}
            />} />
            <Route component={Lost} />
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
