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
    answeredNumber: 0,
    timerStart: 0,
  }

  componentDidMount() {
    this.getGame()
    document.addEventListener("scroll", this.getTop)
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.getTop)
    if (this.intervalTimer !== null) {
      clearInterval(this.intervalTimer);
    }
  }

  redirectHome = () => {
    if (!this.props.user) {
      return <Redirect to="/" />
    }
  }

  getTop = () => {
    const timePlace = document.getElementById("timePlace");
    if (window.scrollY <= 243.9) {
      timePlace.style.position = "relative";
      timePlace.style.zIndex = 12;
      timePlace.style.width = "100%";
      timePlace.style.textAlign = "center";
      timePlace.style.borderBottom = "none";
    } else {
      timePlace.style.position = "fixed";
      timePlace.style.top = "0px";
      timePlace.style.width = "100%";
      timePlace.style.left = "0px";
      timePlace.style.zIndex = 12;
      timePlace.style.textAlign = "center";
      timePlace.style.borderBottom = ".5px darkred solid";
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
        const timeDisp = this.displayTime(result.data.questions.length * 30)
        let numberOfQuestions = result.data.questions.length;
        let placeholderArray = [];
        for (let i = 0; i < numberOfQuestions; i++) {
          placeholderArray.push("");
        }
        // console.log(placeholderArray)
        this.setState({
          game: result.data,
          loaded: true,
          userAnswers: placeholderArray,
          title: result.data.title,
          timerStart: `${timeDisp[0]} : ${timeDisp[1]}`
        })
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
    clearInterval(this.intervalTimer)
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
    this.setState(prevState => {
      prevState.start = true;
      return prevState;
    }, () => {
      this.gameTimer();
    });

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
        submitAnswers={this.submitAnswers}
      />
    )
  }

  gameTimer = () => {
    const howMany = this.state.game.questions.length;
    const timePlace = document.getElementById("timePlace");
    // console.log(timePlace.getBoundingClientRect().top)
    // console.log(howMany)
    let timeLeft = howMany * 30;
    // console.log(timeLeft);
    // console.log(timeLeft % 60);
    // const minsLeft = Math.floor(timeLeft/60);
    // const secsLeft = timeLeft % 60;
    // console.log(minsLeft, secsLeft);
    this.intervalTimer = setInterval(() => {
      if (timeLeft === 0) {
        this.outOfTime();
      } else {
        timeLeft--;
        // Do sometime to display time;
        const timeDisp = this.displayTime(timeLeft);
        // console.log(timeDisp);
        timePlace.textContent = `${timeDisp[0]} : ${timeDisp[1]}`;
        // Temp fix
        // console.log(timeLeft);
      }
    }, 1000)
  }

  displayTime = (timeLeft) => {
    const minsLeft = Math.floor(timeLeft / 60);
    const secsLeft = timeLeft % 60;
    let minDisp, secDisp;
    if (minsLeft === 0) {
      minDisp = "00";
    } else if (minsLeft < 10) {
      minDisp = `0${minsLeft}`
    } else {
      minDisp = minsLeft
    }

    if (secsLeft === 0) {
      secDisp = "00";
    } else if (secsLeft < 10) {
      secDisp = `0${secsLeft}`
    } else {
      secDisp = secsLeft
    }

    return [minDisp, secDisp];
  }

  intervalTimer = null;

  outOfTime = () => {
    clearInterval(this.intervalTimer);
    console.log("Out of time!")
    const timePlace = document.getElementById("timePlace");
    timePlace.textContent = "Out of Time!"
    this.submitAnswers();
  }

  render() {
    return (
      <div className="container">
        {this.redirectHome()}
        {this.redirectResultPage()}
        <Header user={this.props.user} logoutUser={this.props.logoutUser} />
        <div className="wrapper">
          {this.state.loaded ? <div>
            <h2 className="text-center main-title">Quiz Title: {this.state.game.title}</h2>
            <h3 className="text-center main-title">Category: {this.state.game.category}</h3>
            <h3 className="text-center main-title">Time Limit: 30 seconds per question</h3>
            <div id="timeHolder">
              <h3 className="text-center" id="timePlace">{this.state.timerStart}</h3>
            </div>
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