import React, { Component } from 'react';
import "./game.css";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

import Header from "../../components/Header";
import Question from "../../components/Question";
import FullQuizLoader from "../../components/FullQuizLoader";

class Game extends Component {
  state = {
    loaded: false,
    game: {},
    userAnswers: [],
    styleList: true,
    start: false,
    title: "",
    sendResultPage: false,
    answeredNumber: 0
  }

  componentDidMount() {
    this.getGame()
  }

  redirectHome = () => {
    if (!this.props.user) {
      return <Redirect to="/" />
    }
  }

  redirectResultPage = () => {
    if (this.state.sendResultPage) {
      return <Redirect to="/resultpage" />
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
        // console.log(placeholderArray)
        this.setState({ game: result.data, loaded: true, userAnswers: placeholderArray, title: result.data.title })
      })
      .catch(err => console.log(err))
  }

  handleAnswer = e => {
    const whichClass = e.target.dataset.which;
    const answerBtnsQ = [].slice.call(document.querySelectorAll(".forQuestion" + whichClass));
    answerBtnsQ.forEach(one => one.classList.remove("clickedAnswer"));
    e.target.classList.add("clickedAnswer");
    const answer = e.target.dataset.answer;

    this.setState((prevState) => {
      prevState.userAnswers[whichClass] = answer;
      prevState.answeredNumber = this.state.answeredNumber + 1;
      return prevState;
    }, () => {
      console.log(this.state.userAnswers)
    })
  }

  submitAnswers = () => {
    API.gradeGame(this.props.gameSelectID, this.state.userAnswers)
      .then(result => {
        console.log(result)
        this.props.handleGameResult(result.data, this.state.title, () => {
          this.setState({ sendResultPage: true })
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  switchListHandle = () => {
    this.setState({ styleList: !this.state.styleList })
  }

  startQuiz = () => {
    this.setState({ start: true })
  }

  displayQuestions = () => {
    if (this.state.styleList) {
      return this.listStyle();
    }
    return this.oneQStyle()
  }

  listStyle = () => {
    return (
      <div className="check">
        {this.state.game.questions.map((question, i) =>
          <Question
            key={"Question" + i}
            question={question.question}
            answers={question.answers}
            iQues={i}
            handleAnswer={this.handleAnswer}
            styleList={this.state.styleList}
          />
        )}
        <button className="subBtn" onClick={this.submitAnswers}>Submit Answers</button>
      </div>
    )
  }

  oneQStyle = () => {
    console.log(this.state.game)
    const questionList = this.state.game.questions;
    console.log(questionList)
    return (
      <FullQuizLoader
        game={this.state.game}
        styleList={this.state.styleList}
        handleAnswer={this.handleAnswer}
        answeredNumber={this.state.answeredNumber}
        userAnswers={this.state.userAnswers}
      />
    )
  }

  render() {
    return (
      <div className="container">
        {this.redirectHome()}
        {this.redirectResultPage()}
        <Header user={this.props.user} logoutUser={this.props.logoutUser} />
        <div className="wrapper">
          {this.state.loaded ? <div>
            <h2 className="text-center">Quiz Title: {this.state.game.title}</h2>
            <h3 className="text-center">Category: {this.state.game.category}</h3>
            <h3 className="text-center">Time Limit: 30 seconds per question</h3>
            {this.state.start ? null :
              <div className="beforeQuiz">
                <div className="styleGame">
                  <h4 className={this.state.styleList ? "styleText activeStyle" : "styleText"}>Full Quiz at Once</h4>
                  <div className="switchHolder" onClick={this.switchListHandle}>
                    <div className={this.state.styleList ? "switchButton leftSwitchButton" : "switchButton rightSwitchButton"}></div>
                  </div>
                  <h4 className={this.state.styleList ? "styleText" : "styleText activeStyle"}>One Question at a Time</h4>
                </div>
                <button className="beginBtn" onClick={this.startQuiz}>Begin Quiz</button>
              </div>
            }
            {/* Need to map based on what kind of quiz the user selects */}
            {/* More ternaries and and in components to handle questions for the quiz */}

            {this.state.start ? this.displayQuestions() : null}

          </div>


            : null}
        </div>
      </div>
    );
  }
}

export default Game;