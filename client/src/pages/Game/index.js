import React, { Component } from 'react';
import "./game.css";

import API from "../../utils/API";

class Game extends Component {
  state = {
    loaded: false,
    game: {},
    userAnswers: [],
  }

  componentDidMount() {
    this.getGame()
  }

  getGame = () => {
    API.getGameByID(this.props.gameSelectID)
      .then(result => {
        console.log(result.data);
        console.log(result.data.questions.length);
        let numberOfQuestions = result.data.questions.length;
        let placeholderArray = [];
        for (let i = 0; i < numberOfQuestions; i++) {
          placeholderArray.push("");
        }
        console.log(placeholderArray)
        this.setState({ game: result.data, loaded: true, userAnswers: placeholderArray })
      })
      .catch(err => console.log(err))
  }

  handleAnswer = (i, answer) => {
    console.log(i, answer);
    this.setState((prevState) => {
      prevState.userAnswers[i] = answer;
      return prevState;
    })
  }

  submitAnswers = () => {
    API.gradeGame(this.props.gameSelectID, this.state.userAnswers)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }


  // Need to turn questions map into component
  render() {
    return (
      <div>
        {this.state.loaded ? <div>
          <h1>{this.state.game.title}</h1>
          {this.state.game.questions.map((question, i )=> <div key={i}>
            <h2>{question.question}</h2>
              {question.answers.map((answer, indexAnswers)=> <div key={indexAnswers}>
                <button onClick={e => this.handleAnswer(i, answer)} data-which={i} data-answer={answer}>{answer}</button>
              </div>)}
          </div>)}
          <hr />
          <button onClick={this.submitAnswers}>Submit</button>
        </div> : null}
      </div>
    );
  }
}

export default Game;