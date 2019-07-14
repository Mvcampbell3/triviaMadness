import React, { Component } from 'react';
import "./game.css";

import API from "../../utils/API";

class Game extends Component {
  state = {
    loaded: false,
    game: {}
  }

  componentDidMount() {
    this.getGame()
  }

  getGame = () => {
    API.getGameByID(this.props.gameSelectID)
      .then(result => {
        console.log(result.data);
        this.setState({ game: result.data, loaded: true })
      })
      .catch(err => console.log(err))
  }
  // Need to turn questions map into component
  render() {
    return (
      <div>
        {this.state.loaded ? <div>
          <h1>{this.state.game.title}</h1>
          {this.state.game.questions.map((question, i )=> <div key={i}>
            <h2>{question.question}</h2>
              {question.answers.map((answer, i)=> <div key={i}>
                <button data-correct={question.correct} data-which={answer}>{answer}</button>
              </div>)}
          </div>)}
        </div> : null}
      </div>
    );
  }
}

export default Game;