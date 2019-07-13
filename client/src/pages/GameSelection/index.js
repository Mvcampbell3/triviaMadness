import React, { Component } from 'react';
import "./gameSelection.css";
import API from "../../utils/API"
import { Redirect } from "react-router-dom";

class GameSelection extends Component {
  state = {
    gamesLatest: [],
    userID: "",
    username:"",
    user: "",
  }

  componentDidMount() {
    this.checkAuth();
  }

  getAllGames = () => {
    API.getAllGames()
      .then(result => {
        console.log(result)
        this.setState({gamesLatest: result.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  checkAuth = () => {
    API.checkAuth()
      .then(result => {
        console.log(result);
        this.setState({user:result.data.user, username: result.data.username, userID: result.data.id})
        if (result.data.user) {
          this.getAllGames();
        }
      })
      .catch(err => console.log(err))
  }

  redirectLogin = () => {
    if (this.state.user === false){
      return <Redirect to="/login" />
    }
  }

  render() {
    return (
      <div>
        {this.redirectLogin()}
        <h1>This is the Games Page</h1>
        {this.state.gamesLatest.map(game => <div key={game._id}>
          <button>{game.topic}</button>
        </div>)}
      </div>
    );
  }
}

export default GameSelection;