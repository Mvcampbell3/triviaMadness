import React, { Component } from 'react';
import "./fullQuizLoader.css";

import Question from "../../components/Question"

class FullQuizLoader extends Component {

  state = {
    questionMap: [],
    turn: 0
  }

  componentDidMount() {
    console.log(this.props.game)
  }

  moveRight = () => {
    const holder = document.getElementById("questionHolder");
    const oldPos = this.state.turn * -300;
    holder.animate([
      {transform: `translateX(${oldPos}px)`},
      {transform: `translateX(${oldPos - 300}px)`}
    ], {
      duration: 350,
      fill: "forwards"
    });
    this.setState({turn: this.state.turn+1});
  }

  render() {
    return (
      <div className="windowAround">
        <div className="fullQuiz" key={"check2"} id="questionHolder">
          {this.props.game.questions.map((question, i) =>
            <div className="check" key={i}>
              <Question
                key={"Question" + i}
                question={question.question}
                answers={question.answers}
                iQues={i}
                handleAnswer={this.handleAnswer}
              />
              <button id="nextBtn" className="nextBtn" onClick={this.moveRight}>Next</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FullQuizLoader;