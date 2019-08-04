import React, { Component } from 'react';
import "./gameSelection.css";
import API from "../../utils/API"
import { Redirect, Link } from "react-router-dom";

import Header from "../../components/Header";
import Loader from "../../components/Loader";

class GameSelection extends Component {
  state = {
    gamesLatest: [],
    userID: "",
    username: "",
    user: "",
    historyGames: [],
    moviesAndTVGames: [],
    musicGames: [],
    scienceGames: [],
    otherGames: [],
    loaded: false
  }

  componentDidMount() {
    this.checkAuth();
  }

  getAllGames = () => {
    API.getAllGames()
      .then(result => {
        console.log(result)
        this.setState(prevState => {
          prevState.gamesLatest = result.data;
          prevState.historyGames = result.data.filter(game => game.category === "History");
          prevState.moviesAndTVGames = result.data.filter(game => game.category === "Movies and TV");
          prevState.musicGames = result.data.filter(game => game.category === "Music");
          prevState.scienceGames = result.data.filter(game => game.category === "Science");
          prevState.otherGames = result.data.filter(game => game.category === "Other");
          return prevState;
        }, () => {
          console.log(this.state);
          // this.setState({ loaded: true })
          console.log("loaded");
          setTimeout(() => {
            this.setState({ loaded: true });
            console.log("timeout ran")
            
          }, 750)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  checkAuth = () => {
    API.checkAuth()
      .then(result => {
        console.log(result);
        this.setState({ user: result.data.user, username: result.data.username, userID: result.data.id })
        if (result.data.user) {
          this.getAllGames();
        }
      })
      .catch(err => console.log(err))
  }

  redirectLogin = () => {
    if (this.state.user === false) {
      return <Redirect to="/login" />
    }
  }

  redirectHome = () => {
    if (this.props.sendHome === true) {
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <div className="container">
        <Header user={this.props.user} logoutUser={this.props.logoutUser} />
        <div className="wrapper">
          {this.redirectLogin()}
          {this.redirectHome()}
          {this.state.loaded ? <div className="gamesHolder">
            <div className="gameDiv">
              <h3 className="text-center">History Quizzes</h3>
              {this.state.historyGames.map(game => <div key={game._id}>
                <Link to="/playgame" className="gameLink" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
              </div>)}
            </div>
            <div className="gameDiv">
              <h3 className="text-center">Movie and TV Quizzes</h3>
              {this.state.moviesAndTVGames.map(game => <div key={game._id}>
                <Link to="/playgame" className="gameLink" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
              </div>)}
            </div>
            <div className="gameDiv">
              <h3 className="text-center">Music Quizzes</h3>
              {this.state.musicGames.map(game => <div key={game._id}>
                <Link to="/playgame" className="gameLink" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
              </div>)}
            </div>
            <div className="gameDiv">
              <h3 className="text-center">Science Quizzes</h3>
              {this.state.scienceGames.map(game => <div key={game._id}>
                <Link to="/playgame" className="gameLink" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
              </div>)}
            </div>
            <div className="gameDiv">
              <h3 className="text-center">Other Quizzes</h3>
              {this.state.otherGames.map(game => <div key={game._id}>
                <Link to="/playgame" className="gameLink" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
              </div>)}
            </div>
          </div> : <Loader />}
        </div>
      </div>
    );
  }
}

export default GameSelection;