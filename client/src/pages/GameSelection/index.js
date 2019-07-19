import React, { Component } from 'react';
import "./gameSelection.css";
import API from "../../utils/API"
import { Redirect, Link } from "react-router-dom";

import Header from "../../components/Header";

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
          this.setState({ loaded: true })
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
          <h1 className="text-center">This is the Games Page</h1>
          {this.state.loaded ? <div>
            <h3 className="text-center">History Games</h3>
            {this.state.historyGames.map(game => <div key={game._id}>
              <Link to="/playgame" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
            </div>)}
            <h3 className="text-center">Movie and TV Games</h3>
            {this.state.moviesAndTVGames.map(game => <div key={game._id}>
              <Link to="/playgame" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
            </div>)}
            <h3 className="text-center">Music Games</h3>
            {this.state.musicGames.map(game => <div key={game._id}>
              <Link to="/playgame" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
            </div>)}
            <h3 className="text-center">Science Games</h3>
            {this.state.scienceGames.map(game => <div key={game._id}>
              <Link to="/playgame" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
            </div>)}
            <h3 className="text-center">Other Games</h3>
            {this.state.otherGames.map(game => <div key={game._id}>
              <Link to="/playgame" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
            </div>)}
          </div> : null}


          {/* {this.state.gamesLatest.map(game => <div key={game._id}>
            <Link to="/playgame" data-game_id={game._id} onClick={e => this.props.handleGameSelect(e)}>{game.title}</Link>
          </div>)} */}

        </div>
      </div>
    );
  }
}

export default GameSelection;