import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import "./createGame.css";
import API from '../../utils/API';
import Scroll from "react-scroll";

import Header from "../../components/Header"

const Events = Scroll.Events;
const scroll = Scroll.animateScroll;
const scrollSpy = Scroll.scrollSpy;

class CreateGame extends Component {
  state = {
    title: "",
    category: "",
    gameObj: {},
    created: false,
    scrollNumber: 500
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function(to, element) {
      // console.log("begin", arguments);
    });
    Events.scrollEvent.register('end', function(to, element) {
      // console.log("end", arguments);
    });
    scrollSpy.update();

  }

  componentWillUnmount() {

    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
    
  }

  sendToLogin = () => {
    if (this.props.user === false) {
      return <Redirect to="/login" />
    } else {
      return
    }
  }

  sendToGames = () => {
    if (this.state.created === true) {
      return <Redirect to="/games" />
    } else {
      return
    }
  }

  // Need to add checkAuth here and redirect to home page just like in Game Selection page

  addQuestion = () => {
    const questionCreateArea = document.getElementById("questionCreateArea");

    const newQuestion = document.createElement("div");
    newQuestion.className = "newQuestion"
    newQuestion.dataset.question = "empty";
    newQuestion.dataset.answer0 = "empty";
    newQuestion.dataset.answer1 = "empty";
    newQuestion.dataset.answer2 = "empty";
    newQuestion.dataset.answer3 = "empty";
    newQuestion.dataset.correct = "empty";

    const delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.addEventListener("click", function() {
      this.parentElement.className = "deleteQuestion";
    })
    delBtn.textContent = "X";

    const question = document.createElement("input");
    question.type = "text";
    question.name = "question";
    question.autocomplete = "off"
    question.className = "topInput questionInput"
    question.placeholder = `Question`
    question.dataset.holder = "question"
    question.addEventListener("keyup", function() {
      this.parentElement.dataset.question = this.value
    })

    const answerBox = document.createElement("div");
    answerBox.className = "answerBox";
    const answer1Input = document.createElement("input");
    const answer2Input = document.createElement("input");
    const answer3Input = document.createElement("input");
    const answer4Input = document.createElement("input");
    const answer1Button = document.createElement("button");
    const answer2Button = document.createElement("button");
    const answer3Button = document.createElement("button");
    const answer4Button = document.createElement("button");

    const answer1 = document.createElement("div");
    const answer2 = document.createElement("div");
    const answer3 = document.createElement("div");
    const answer4 = document.createElement("div");

    const answerButtons = [answer1Button, answer2Button, answer3Button, answer4Button];
    const answerInputs = [answer1Input, answer2Input, answer3Input, answer4Input];

    answerButtons.forEach((button, i) => {
      button.className = "answerButton";
      button.textContent = "?";
      button.dataset.holder = `answer${i}`;
      button.setAttribute("tabIndex", -1);
      button.addEventListener("click", function() {
        console.log(this.parentElement.parentElement.parentElement.dataset.correct)
        this.parentElement.parentElement.parentElement.dataset.correct =
          this.parentElement.parentElement.parentElement.dataset[this.dataset.holder]
        answerButtons.forEach(one => {
          one.className = "answerButton";
          one.textContent = "?"
          one.style.color = "black"
        });
        this.classList = "answerButton clicked"
        this.innerHTML = "<i class='fas fa-check'></i>"
        this.style.color = "white";
      })
    })

    answerInputs.forEach((one, i) => {
      one.type = "text";
      one.placeholder = `Answer ${i + 1}`;
      one.classList = `answer`;
      one.autocomplete = "off";
      one.dataset.holder = `answer${i}`
      one.addEventListener("keyup", function() {
        const holder = this.dataset.holder;
        const datasets = this.parentElement.parentElement.parentElement.dataset[holder] = this.value;
        console.log(datasets)
        answerButtons.forEach(one => {
          one.className = "answerButton";
          one.textContent = "?"
        })
      })
    })

    const answersArray = [answer1, answer2, answer3, answer4];
    answersArray.forEach(one => {
      one.classList = "answerBox";
    })

    answer1.append(answer1Button, answer1Input);
    answer2.append(answer2Button, answer2Input);
    answer3.append(answer3Button, answer3Input);
    answer4.append(answer4Button, answer4Input);

    answerBox.append(answer1, answer2, answer3, answer4)
    newQuestion.append(delBtn, question, answerBox);
    questionCreateArea.append(newQuestion);

    setTimeout(() => {
      scroll.scrollToBottom();
    }, 280)
  }

  grabQuiz = () => {
    let gameQuestions = [];
    let correctAnswers = [];
    let badQuiz = false;
    const allQuestions = [].slice.call(document.querySelectorAll(".newQuestion"));

    if (!this.state.title || !this.state.category) {
      badQuiz = true;
    }

    allQuestions.forEach(one => {
      if (one.dataset.question === "empty" || one.dataset.answer0 === "empty" || one.dataset.answer1 === "empty" || one.dataset.answer2 === "empty" || one.dataset.answer3 === "empty" || one.dataset.correct === "empty") {
        console.log("this will not work");
        badQuiz = true;
      }
    })

    if (badQuiz) {
      // Put in message handler from app.js!
      return;
    }

    allQuestions.forEach((question, i) => {
      gameQuestions.push({
        question: question.dataset.question,
        answers: [question.dataset.answer0, question.dataset.answer1, question.dataset.answer2, question.dataset.answer3],
      })
      correctAnswers.push(question.dataset.correct)
    })

    console.log(gameQuestions)
    console.log(correctAnswers);

    const sendObj = {
      title: this.state.title,
      category: this.state.category,
      questions: gameQuestions,
      correct: correctAnswers
    }

    console.log(sendObj)
    this.setState(prevState => {
      prevState.gameObj = sendObj;
      return prevState;
    }, () => {
      console.log("prevstate callback");
      this.sumbitGame();
    })
  }

  sumbitGame = () => {
    API.createNewGame(this.state.gameObj)
      .then(result => {
        if (result.data._id) {
          this.setState(prevState => {
            prevState.created = true;
            return prevState
          })
        }
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  changeSelect = () => {
    console.log("onChange")
    this.setState({ category: document.getElementById("category").value })
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="container">
        <Header user={this.props.user} logoutUser={this.props.logoutUser} />
        <div className="wrapper">
          {this.sendToLogin()}
          {this.sendToGames()}
          <h1 className="text-center main-title">Game Create</h1>
          <h4 className="text-center main-title">Enter in the informaiton you want to make your game about</h4>
          <div className="inputGroup">
            <label>Title of the Quiz</label>
            <input
              value={this.state.title}
              type="text"
              name="title"
              placeholder="Quiz Title..."
              onChange={e => this.handleInput(e)}
              autoComplete="off"
              className="topInput"
            />
          </div>
          <div className="inputGroup">
            <label>Category of the Quiz</label>
            <select id="category" onChange={this.changeSelect}>
              <option value="did not select">Pick Category:</option>
              <option value="History">History</option>
              <option value="Movies and TV">Movies and TV</option>
              <option value="Science">Science</option>
              <option value="Music">Music</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <hr />
          <div id="questionCreateArea"></div>
          <button className="addQBtn" onClick={this.addQuestion}>Add Question</button>
          <button className="submitBtn" onClick={this.grabQuiz}>Submit Quiz</button>
        </div>
      </div>
    );
  }
}

export default CreateGame;