import React, { Component } from 'react';
import "./fullQuizLoader.css";

import Question from "../../components/Question"

class FullQuizLoader extends Component {

  state = {
    questionsLength: 0,
    turn: 0,

  }

  componentDidMount() {
    console.log(this.props.game)
    console.log(this.props.game.questions.length)
    this.setState({ questionsLength: this.props.game.questions.length })
  }

  moveRight = () => {
    if (this.state.turn < this.state.questionsLength - 1) {
      const holder = document.getElementById("questionHolder");
      const oldPos = this.state.turn * -300;
      holder.animate([
        { transform: `translateX(${oldPos}px)` },
        { transform: `translateX(${oldPos - 300}px)` }
      ], {
          duration: 350,
          fill: "forwards"
        });
      this.setState({ turn: this.state.turn + 1 });
    } else {
      console.log("no more questions")
    }
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
                handleAnswer={this.props.handleAnswer}
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