import React, { Component } from 'react';
import "./game.css";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

import Header from "../../components/Header"

class Game extends Component {
  state = {
    loaded: false,
    game: {},
    userAnswers: [],
  }

  componentDidMount() {
    this.getGame()
  }

  redirectHome = () => {
    if (!this.props.user){
      return <Redirect to="/" />
    }
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

  handleAnswer = e => {

    const whichClass = e.target.dataset.which;
    const answerBtnsQ = [].slice.call(document.querySelectorAll(".forQuestion" + whichClass));
    answerBtnsQ.forEach(one => one.classList.remove("clicked"));
    e.target.classList.add("clicked");
    const answer = e.target.dataset.answer;

    this.setState((prevState) => {
      prevState.userAnswers[whichClass] = answer;
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
      <div className="container">
        {this.redirectHome()}
        <Header user={this.props.user} logoutUser={this.props.logoutUser} />
        <div className="wrapper">
          <h1 className="text-center">Play Game Area</h1>
          {this.state.loaded ? <div>
            <h3 className="text-center">Quiz Title: {this.state.game.title}</h3>
            <h3 className="text-center">Category: {this.state.game.category}</h3>
            {this.state.game.questions.map((question, i) => <div key={i}>
              <h3>{i + 1} {question.question}</h3>
              {question.answers.map((answer, indexAnswers) => <div key={indexAnswers}>
                <button
                  className={`answerBtn forQuestion${i}`}
                  onClick={e => this.handleAnswer(e)}
                  data-which={i}
                  data-answer={answer}
                >
                  {answer}
                </button>
              </div>)}
            </div>)}
            <hr />
            <button onClick={this.submitAnswers}>Submit</button>
          </div> : null}
        </div>
      </div>
    );
  }
}

export default Game;